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
        return res.status(200).json({products, status: true})
    }
    createProduct = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let listProduct = req.body
        for (let i = 0; i < listProduct.products.length; i++) {
            listProduct.products[i].account = token.account_id
            await Products.create(listProduct.products[i])
        }
        return res.status(201).json({
            message: "Create new product done",
            status: true
        })

    }
    updateProduct = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let product = await Products.find({slug: req.params.productName, account: token.account_id})
        if (product.length) {
            await Products.updateOne({slug: req.params.productName}, req.body)
            return res.status(200).json({
                message: 'Update product done',
                status: true
            })
        } else {
            return res.status(200).json({
                message: "Product not found",
                status: false
            })
        }
    }
    deleteProduct = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Products.deleteOne({slug: req.params.productName, account: token.account_id})
        return res.status(200).json({
            message: 'delete done',
            status: true
        })
    }
    showMyShop = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let infoShop = await MerchantShop.find({account: token.account_id}).populate('account', 'username')
        let products = await Products.find({account: token.account_id})
        return res.status(200).json({infoShop, products, status: true})
    }
    createShop = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let shops = await MerchantShop.find({account: token.account_id})
        if (shops.length) {
            return res.status(200).json({
                message: "You already have a store so you can't create more",
                status: false
            })
        } else {
            let infoShop = req.body
            infoShop.account = token.account_id
            await MerchantShop.create(infoShop)
            return res.status(201).json({
                message: "Create new Shop done",
                status: true
            })
        }
    }
    updateShop = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let merchantShops = await MerchantShop.find({slug: req.params.nameShop, account: token.account_id})
        if (merchantShops.length) {
            await MerchantShop.updateOne({slug: req.params.nameShop, account: token.account_id}, req.body)
            return res.status(200).json({
                message: 'Update done',
                status: true
            })
        } else {
            return res.status(200).json({
                message: 'Shop not found',
                status: false
            })
        }
    }

    showBills = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bills = await Bills.find({account_merchant: token.account_id}).sort({'time': -1})
        return res.status(200).json({
            bills,
            status: true
        })
    }
    acceptBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Bills.updateMany({_id: req.body.billId, account_merchant: token.account_id}, {confirm_bill: true})
        return res.status(200).json({
            message: "Accept done",
            status: true
        })
    }
    showBillDetails = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bill = await Bills.find({
            account_merchant: token.account_id,
            account_customer: req.params.billId
        }).populate('bills', 'username')
        return res.status(200).json({bill, status: true})
    }

    deleteBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Bills.deleteOne({_id: req.params.billId, account: token.account_id})
        return res.status(200).json({
            message: 'delete done',
            status: true
        })
    };
    filterStatusBill = async (req: Request, res: Response) => {
        let bills = await Bills.find({payment_status: req.params.payment_status}).populate('time')
        return res.status(200).json({bills, status: true})
    }
    searchBillById = async (req: Request, res: Response) => {
        try {
            let findBillsById = await Bills.find({_id: req.body.billId});
            if (findBillsById.length != 0) {
                return res.status(200).json({findBillsById, status: true})
            } else {
                return res.status(200).json({
                    message: "Id not found",
                    status: false
                })
            }
        } catch (err) {
            return res.send(err.stack);
        }
    }
    searchBillByName = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let findUsername = await Account.find({username: req.body.username, role: 0})
        if (findUsername.length != 0) {
            let findBillsByUsername = await Bills.find({
                account_merchant: token.account_id,
                account_customer: findUsername[0]._id
            }).populate('account_customer', 'username')
            if (findBillsByUsername.length != 0) {
                return res.status(200).json({findBillsByUsername, status: true})
            } else {
                return res.status(200).json({
                    message: "Username that hasn't purchased from your store",
                    status: false
                })
            }
        } else {
            return res.status(200).json({
                message: "Username does not exist",
                status: false
            })
        }
    }
    searchBillByPhone = async (req: Request, res: Response) => {
        try {
            let token = await this.getToken(req)
            let findBillsByPhoneNumber = await Bills.find({
                account_merchant: token.account_id,
                phoneNumber: req.body.phoneNumber
            }).populate('account_customer', 'username')
            if (findBillsByPhoneNumber.length != 0) {
                return res.status(200).json({findBillsByPhoneNumber, status: true})
            } else {
                return res.status(200).json({
                    message: "Username that hasn't purchased from your store",
                    status: false
                })
            }
        } catch (err) {
            return res.send(err.stack);
        }
    }
    getBill = async (req: Request, res: Response) => {

    }

}

export default new MerChantController()