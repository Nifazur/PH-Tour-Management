/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes'
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errorHelpers/AppError';
import { setAuthCookie } from '../../utils/setCookie';
import { createUserTokens } from '../../utils/userTokens';
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const logInInfo = await AuthServices.credentialsLogin(req.body)
    // res.cookie("accessToken",logInInfo.accessToken,{
    //     httpOnly: true,
    //     secure: false
    // })
    // res.cookie("refreshToken", logInInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, logInInfo)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged In Successfully",
        data: logInInfo
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token Received From Cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    // res.cookie("accessToken",tokenInfo.accessToken,{
    //     httpOnly: true,
    //     secure: false
    // })
    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New Access Token Retrieved Successfully",
        data: tokenInfo
    })
})
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Log out Successfully",
        data: []
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user
    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reset Password Successfully",
        data: null
    })
})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }
    const user = req.user;
    // eslint-disable-next-line no-console
    console.log({ user: user });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }
    const tokenInfo = await createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallbackController
}