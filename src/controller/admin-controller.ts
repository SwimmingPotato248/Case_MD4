import {Request, Response} from "express";
import {Account} from "../model/account";
import {MerchantShop} from "../model/merchant-shop";
import {Notice} from "../model/notice";
import {Products} from "../model/product";


export class AdminController {
    getToken = async (req: any) => {
        return req.decode
    }
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

    showUsers = async (req: Request, res: Response) => {
        let users = await Account.find({role: 0})
        let listUser = []
        users.forEach(item => {
            let user = {
                id: item._id,
                username: item.username,
                status: item.status,
                role: item.role
            }
            listUser.push(user)
        })
        return res.status(200).json(listUser)
    }

    // merchantDetail = async (req: Request, res: Response) => {
    //     console.log(req.params.username)
    //     let merchant = await MerchantShop.findOne({
    //         username: req.params.username})
    //     return res.status(200).json(merchant)
    // }

    changeStatusMember = async (req: Request, res: Response) => {
        try {
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
                        return res.status(200).json({
                            account,
                            message: "Lock users done",
                            status: true
                        })
                    } else {
                        account[0].status = true
                        await Account.updateOne(
                            {username: req.body.username},
                            {
                                $set: {status: true}
                            })
                        return res.status(200).json({
                            account,
                            message: "Unlock users done",
                            status: true
                        })
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

    notice = async (req: Request, res: Response) => {
        let notice = await Notice.find({status: true})
        return res.status(200).json({
            notice,
            status: true
        })
    }

    acceptUpgrade = async (req: Request, res: Response) => {
        let userId = req.params.userId
        await Account.updateOne({_id: userId}, {$set: {role: 1}})
        await Notice.updateOne({user_id: userId}, {$set: {status: false}})
        return res.status(200).json({
            message: "Upgrade done",
            status: true
        })
    }

    rejectUpgrade = async (req: Request, res: Response) => {
        let userId = req.params.userId
        await Notice.updateOne({user_id: userId}, {$set: {status: false}})
        return res.status(200).json({
            message: "Reject done",
            status: true
        })
    }
    getProduct = async (req: Request, res: Response) => {
        let products = await Products.find().sort({quantitySold: -1})
        return res.status(200).json(products)
    }
    infoUsers = async (req: Request, res: Response) => {
        try{
            let infoUser = await Account.find({username: req.params.usersId})
            let infoShop = await MerchantShop.find({account: infoUser[0]._id})
            return res.status(200).json({
                infoUser,
                infoShop
            })
        } catch (err) {
            return res.send(err.stack);
        }
    }


}

export default new AdminController()