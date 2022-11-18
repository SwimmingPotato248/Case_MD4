import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {Account} from "../model/account";
import jwt from "jsonwebtoken"

export class LoginController {
    register = async (req: Request, res: Response) => {
        let account = req.body
        account.password = await bcrypt.hash(account.password, 10)
        account = await Account.create(account)
        return res.status(201).json(account)
    }
    login = async (req: Request, res: Response) => {
        let account = req.body
        let findAccount = await Account.findOne({
            username: account.username
        })
        if (!findAccount) {
            return res.status(203).json({
                message: "Account is not defined"
            })
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount.password)
            if (!comparePassword) {
                return res.status(200).json({
                    message: "Password is wrong"
                })
            } else {
                let payload = {
                    account_id: findAccount._id,
                    username: findAccount.username,
                    status: findAccount.status,
                    role: findAccount.role
                }
                let secret = '18!11'
                let token =  jwt.sign(payload, secret, {
                    expiresIn: 12*60*60*1000
                } )
                return res.status(200).json({
                    token: token
                })
            }
        }
    }
}

export default new LoginController()