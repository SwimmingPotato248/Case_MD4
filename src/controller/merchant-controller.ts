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
    searchProduct = async (req: Request , res: Response) => {
        let searchProduct = await Products.find({'name' : new RegExp(req.body.name, 'i')});
        return res.status(201).json(
            searchProduct
        )
    }
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


    deleteBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Bills.deleteOne({_id: req.params.billId, account: token.account_id})
        return res.status(200).json({
            message: 'delete done'
        })
    };
    filterStatusBill = async (req: Request, res: Response) => {
        let bills = await Bills.find({payment_status: req.params.payment_status}).populate('time')
        return res.status(200).json(bills)
    }
    searchBillByName = async (req: Request , res: Response) => {
        let searchUsername = await Account.find({username: req.params.username })
        console.log(searchUsername)
        // let searchBillByName = await Bills.find({account_merchant : new RegExp(req.params.username, 'i')});
        return res.status(200).json(
            searchUsername
        )
    }
    searchBillByPhone = async (req: Request , res: Response) => {
        let searchBillByPhone = await Bills.find({phoneNumber : new RegExp(req.params.phoneNumber, 'i')});
        return res.status(200).json(
            searchBillByPhone
        )
    }
    searchBillById = async (req: Request , res: Response) => {
        let searchBillById = await Bills.find({_id : req.params.id});
        return res.status(200).json(
            searchBillById
        )
    }
}

export default new MerChantController()