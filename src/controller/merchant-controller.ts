import {Request, Response} from "express";
import {Products} from "../model/product";
import {Account} from "../model/account";
import {MerchantShop} from "../model/merchant-shop";
import {Bills} from "../model/bills";

export class MerChantController {
    getToken = async (req: any) => {
        return req.decode
    }

    showProducts = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let products = await Products.find({account: token.account_id}).populate('account', 'username')
        return res.status(200).json(products)
    }
    createProduct = async (req: Request, res: Response) => {
        let product = req.body
        let token = await this.getToken(req)
        product.account = token.account_id
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
        let token = await this.getToken(req)
        await Products.deleteOne({_id: req.params.productId, account: token.account_id})
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
        let token = await this.getToken(req)
        let infoShop = await MerchantShop.find({account: token.account_id}).populate('account', 'username')
        return res.status(200).json(infoShop)
    }
    createShop = async (req: Request, res: Response) => {
        let infoShop = req.body
        let token = await this.getToken(req)
        infoShop.account = token.account_id
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

    showBills = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bills = await Bills.find({account_merchant: token.account_id}).populate('bills', 'username')
        return res.status(200).json(bills)
    }
    showBillDetails = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bill = await Bills.find({
            account_merchant: token.account_id,
            account_customer: req.params.billId
        }).populate('bills', 'username')
        return res.status(200).json(bill)
    }

}

export default new MerChantController()