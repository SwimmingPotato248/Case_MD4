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
        let merchants = await Account.find({username: req.params.username, role: 1})
        if (merchants[0].status === true) {
            merchants[0].status = false
            await Account.updateOne(
                {username: req.params.username},
                {
                    $set: {status: false}
                })
            return res.status(200).json(merchants)
        } else {
            merchants[0].status = true
            await Account.updateOne(
                {username: req.params.username},
                {
                    $set: {status: true}
                })
            return res.status(200).json(merchants)
        }
    }


}

export default new AdminController()