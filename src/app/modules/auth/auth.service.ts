import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from 'http-status-codes'
import bcryptjs from 'bcryptjs'

const credentialsLogin = async (payload: Partial<IUser>) => {
    const {email, password} = payload

    const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string ,isUserExist.password as string)

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    return {
        email
    }
    
}

export const AuthServices = {
    credentialsLogin
}