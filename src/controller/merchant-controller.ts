import {Request, Response} from "express";
import {Products} from "../model/product";
import {Account} from "../model/account";
import {MerchantShop} from "../model/merchant-shop";

export class MerChantController {
    showProducts = async (req: Request, res: Response) => {
        let account = await Account.find({username: req.params.username, role: 1})
        let products = await Products.find({account: account[0]._id}).populate('account', 'username')
        return res.status(200).json(products)
    }
    createProduct = async (req: Request, res: Response) => {
        let product = req.body
        let account = await Account.find({username: req.params.username, role: 1})
        product.account = account[0]._id
        await Products.create(product)
        return res.status(201).json({
            message: "Create new product done"
        })
    }
    updateProduct = async (req: Request, res: Response) => {
        await Products.updateOne({_id: req.params.productId}, req.body)
        return res.status(200).json({
            message: 'update done'
        })
    }
    deleteProduct = async (req: Request, res: Response) => {
        let account = await Account.find({username: req.params.username, role: 1})
        await Products.deleteOne({_id: req.params.productId, account: account[0]._id})
        return res.status(200).json({
            message: 'delete done'
        })
    }
    // search = async (req: Request, res: Response) => {
    //     let searchKey = `/${req.body.searchKey}/`
    //     console.log(searchKey)
    //     // let products = await Products.find({name: searchKey})
    //     let products = await Products.find({name: /pho/})
    //     return res.status(200).json(products)
    // }
    showHome = async (req: Request, res: Response) => {
        let account = await Account.find({username: req.params.username, role: 1})
        let infoShop = await MerchantShop.find({account: account[0]._id}).populate('account', 'username')
        return res.status(200).json(infoShop)
    }
    createShop = async (req: Request, res: Response) => {
        let infoShop = req.body
        let account = await Account.find({username: req.params.username, role: 1})
        infoShop.account = account[0]._id
        await MerchantShop.create(infoShop)
        return res.status(201).json({
            message: "Create new Shop done"
        })
    }
    // updateShop = async (req: Request, res: Response) => {
    //     await MerchantShop.updateOne({_id: req.params.productId}, req.body)
    //     return res.status(200).json({
    //         message: 'update done'
    //     })
    // }

}

export default new MerChantController()