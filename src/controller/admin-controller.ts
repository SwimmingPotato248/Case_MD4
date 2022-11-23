import {Request, Response} from "express";
import {Account} from "../model/account";
import {MerchantShop} from "../model/merchant-shop";


export class AdminController {
    showHome = async (req: Request, res: Response) => {

    }
    showMerchant = async (req: Request, res: Response) => {
        let merchants = await Account.find({role: 1})
        let listMerchant = []
        merchants.forEach(item => {
            let merchant = {
                id: item._id,
                username: item.username,
                status: item.status,
                role: item.role
            }
            listMerchant.push(merchant)
        })
        return res.status(200).json(listMerchant)
    }

    // merchantDetail = async (req: Request, res: Response) => {
    //     console.log(req.params.username)
    //     let merchant = await MerchantShop.findOne({
    //         username: req.params.username})
    //     return res.status(200).json(merchant)
    // }

    changeStatusMerchant = async (req: Request, res: Response) => {
        try{
            let account = await Account.find({username: req.body.username})
            if (account.length != 0) {
                if (account[0].username === 'admin') {
                    return res.status(200).json({
                        message: "You don't have admin lock permission",
                        status: false
                    })
                } else {
                    if (account[0].status === true) {
                        account[0].status = false
                        await Account.updateOne(
                            {username: req.body.username},
                            {
                                $set: {status: false}
                            })
                        return res.status(200).json({account, status: true})
                    } else {
                        account[0].status = true
                        await Account.updateOne(
                            {username: req.body.username},
                            {
                                $set: {status: true}
                            })
                        return res.status(200).json({account, status: true})
                    }
                }
            } else {
                return res.status(200).json({
                    message: "Username not found",
                    status: false
                })
            }
        } catch (err) {
            return res.send(err.stack);
        }
    }


}

export default new AdminController()