import {Request, Response} from "express";
import {Account} from "../model/account";
import {MerchantShop} from "../model/merchant-shop";
import {Products} from "../model/product";


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

    showListUser = async (req: Request, res: Response) => {
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

    quickSearchProduct = async (req: Request, res: Response) => {
        let products = await Products.find({slug: new RegExp(req.body.keyWord, 'i')})
        if (products.length != 0) {
            return res.status(200).json(products)
        } else {
            return res.status(200).json({
                message: "Product not found"
            })
        }
    }

    showFamousProduct
}

export default new AdminController()