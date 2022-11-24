import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {Account} from "../model/account";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";

export class LoginController {
    register = async (req: Request, res: Response) => {
        let account = req.body
        let findAccount = await Account.findOne({
            username: account.username
        })
        if (findAccount) {
            return res.status(203).json({
                message: "Account already exists",
                status: false
            })
        } else {
            account.password = await bcrypt.hash(account.password, 10)
            await Account.create(account)
            return res.status(201).json({
                message: "Register done",
                status: true
            })
        }

    }
    login = async (req: Request, res: Response) => {
        let account = req.body
        let findAccount = await Account.findOne({
            username: account.username
        })
        if (!findAccount) {
            return res.status(203).json({
                message: "Account is not defined",
                status: false
            })
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount.password)
            let findAccountStatus = await Account.find({username: account.username, status: true})
            if (findAccountStatus.length === 1) {
                if (comparePassword) {
                    let payload = {
                        account_id: findAccount._id,
                        username: findAccount.username,
                        status: findAccount.status,
                        role: findAccount.role
                    }
                    let token = jwt.sign(payload, SECRET, {
                        expiresIn: 7 * 24 * 60 * 60 * 1000
                    })
                    return res.status(200).json({
                        token: token,
                        account_id: findAccount._id,
                        role: findAccount.role,
                        status: true
                    })
                } else {
                    return res.status(200).json({
                        message: "Password is wrong",
                        status: false
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Account has been locked",
                    status: false
                })
            }
        }
    }
}

export default new LoginController()