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
        let token = await this.getToken(req)
        let product = await Products.find({slug: req.params.productName, account: token.account_id})
        if (product.length){
            await Products.updateOne({slug: req.params.productName}, req.body)
            return res.status(200).json({
                message: 'Update product done'
            })
        }else {
            return res.status(200).json({
                message: "Product not found"
            })
        }
    }
    deleteProduct = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Products.deleteOne({slug: req.params.productName, account: token.account_id})
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
        let token = await this.getToken(req)
        let shops = await MerchantShop.find({account: token.account_id})
        if (shops.length){
            return res.status(200).json({
                message: "You already have a store so you can't create more"
            })
        } else {
            let infoShop = req.body
            infoShop.account = token.account_id
            await MerchantShop.create(infoShop)
            return res.status(201).json({
                message: "Create new Shop done"
            })
        }
    }
    updateShop = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let merchantShops = await MerchantShop.find({slug: req.params.nameShop, account: token.account_id})
        if (merchantShops.length){
            await MerchantShop.updateOne({slug: req.params.nameShop, account: token.account_id}, req.body)
            return res.status(200).json({
                message: 'update info shop done'
            })
        } else {
            return res.status(200).json({
                message: 'Shop not found'
            })
        }
    }

    showBills = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bills = await Bills.find({account_merchant: token.account_id}).populate('account_merchant', 'username')
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


    deleteBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Bills.deleteOne({_id: req.params.billId, account: token.account_id})
        return res.status(200).json({
            message: 'delete done'
        })
    };
    filterStatusBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bills = await Bills.find({payment_status: token.status}).populate('time')
        return res.status(200).json(bills)
    }
    searchBillByName = async (req: Request , res: Response) => {
        let searchBillByName = await Bills.find({'name' : new RegExp(req.body.name, 'i')});
        return res.status(201).json(
            searchBillByName
        )
    }
    searchBillByPhone = async (req: Request , res: Response) => {
        let searchBillByPhone = await Bills.find({'phoneNumber' : new RegExp(req.body.phoneNumber, 'i')});
        return res.status(201).json(
            searchBillByPhone
        )
    }
    searchBillById = async (req: Request , res: Response) => {
        let searchBillById = await Bills.find({'_id' : new RegExp(req.body._id, 'i')});
        return res.status(201).json(
            searchBillById
        )
    }
}

export default new MerChantController()