/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import AppError from "../../errorHelpers/AppError";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // throw new Error("Fake error")

        // throw new AppError(httpStatus.BAD_REQUEST, "Fake Error")

        const user = await UserServices.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            message: "User created Successfully ",
            user
        })
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log(err);
        next(err)

    }
}

// const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await UserServices.getAllUsers()
//         return users
//     } catch (err: any) {
//         // eslint-disable-next-line no-console
//         console.log(err);
//         next(err)
//     }
// }

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: result
    // })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUsers
}


// route matching -> controller -> service -> model -> DB

// 1st make the model, service, controller and then route