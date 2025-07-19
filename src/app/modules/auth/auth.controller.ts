/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes'
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const logInInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged In Successfully",
        data: logInInfo
    })
})

export const AuthControllers= {
    credentialsLogin
}