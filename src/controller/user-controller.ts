import {Request, Response} from "express";
import {Account} from "../model/account";
import {IProduct, Products} from "../model/product";
import {MerchantShop} from "../model/merchant-shop";
import {Bills, IBill} from "../model/bills";
import {Details} from "../model/bills-details";
import {Notice} from "../model/notice";


export class UserController {
    getToken = async (req: any) => {
        return req.decode
    }
    getTime = () => {
        let day = new Date()
        let today = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
        return today
    }
    submitToMerchant = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let userId = req.body.userId
        // await Account.updateOne({_id: token.account_id}, {$set: {role: 1}})
        let newNotice = {
            user_id: userId
        }
        await Notice.create(newNotice)
        return res.status(200).json({
            userId: userId,
            message: 'Wait for admin to confirm',
            status: true
        })
    }
    showNotice = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let listNotice = await Notice.find({user_id: token.account_id})
        let notice = await  Notice.find({user_id: token.account_id, status: false})
        return res.status(200).json({
            listNotice,
            notice,
            message: 'The account has been denied',
            status: true
        })
    }

    showHomePage = async (req: Request, res: Response) => {
        let products = await Products.find().populate('account', 'username')
        return res.status(200).json({products, status: true})
    }
    showShop = async (req: Request, res: Response) => {
        let shops = await MerchantShop.find()
        return res.status(200).json({shops, status: true})
    }
    detailsShop = async (req: Request, res: Response) => {
        let shops = await MerchantShop.find({slug: req.params.nameShop}).populate('account', 'username')
        if (shops.length != 0) {
            let account = await Account.find({username: shops[0].account.username})
            let products = await Products.find({account: account[0]._id}).populate('account', 'username')
            let details = {
                shop: shops,
                products: products
            }
            return res.status(200).json({details, status: true})
        } else {
            return res.status(200).json({
                message: "Store not found",
                status: false
            })
        }
    }
    detailsProduct = async (req: Request, res: Response) => {
        let products = await Products.find({slug: req.params.productName}).populate('account', 'username')
        // let products = await Products.find({_id: req.params.productName}).populate('account', 'username')
        if (products.length != 0) {
            return res.status(200).json({products, status: true})
        } else {
            return res.status(200).json({
                message: "Product not found",
                status: false
            })
        }
    }
    searchProduct = async (req: Request, res: Response) => {
        // let products = await Products.find({slug: new RegExp(req.body.keyWord, 'i')})
        let products = await Products.find({
            $or: [
                {slug: new RegExp(req.body.keyWord, 'i')},
                {name: new RegExp(req.body.keyWord, 'i')}
            ]
        })
        if (products.length != 0) {
            return res.status(200).json({products, status: true})
        } else {
            return res.status(200).json({
                message: "Product not found",
                status: false
            })
        }
    }
    showMyBills = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let bills = await Bills.find({account_customer: token.account_id})
        if (bills.length != 0) {
            return res.status(200).json({bills, status: true})
        } else {
            return res.status(200).json({
                message: "You have not purchased any products yet, please try again",
                status: false
            })
        }
    }
    billDetails = async (req: Request, res: Response) => {
        try {
            let billDetails = await Details.find({bills: req.params.billId}).populate('product')
            if (billDetails.length != 0) {
                return res.status(200).json({billDetails, status: true})
            } else {
                return res.status(200).json({
                    message: "Bill Id not found",
                    status: false
                })
            }
        } catch (err) {
            return res.send(err.stack);
        }
    }

    confirmBills = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        let data = req.body
        let today = this.getTime()
        let billData = {
            time: today,
            account_customer: token.account_id,
            phoneNumber: data.information.phone,
            address: data.information.address,
            account_merchant: data.information.account_merchant
        }
        let newBill = await Bills.create(billData)
        for (let i = 0; i < data.products.length; i++) {
            let billDetail = {
                bills: newBill._id,
                product: data.products[i].productId,
                quantity: data.products[i].quantity,
                node: data.products[i].node
            }
            await Details.create(billDetail)
        }
        return res.status(200).json({
            message: "Waiting for merchant to confirm",
            newBill,
            status: true
        })
    }
    // payment = async (req: Request, res: Response) => {
    //     let token = await this.getToken(req)
    //     let confirm_bill = await Bills.find({_id: req.body.billId, account_customer: token.account_id})
    //     let billDetails = await Details.find({bills: confirm_bill[0]._id})
    //     if (confirm_bill[0].confirm_bill === true && confirm_bill[0].payment_status === false) {
    //         let today = this.getTime()
    //         await Bills.updateOne({_id: req.body.billId}, {payment_status: true, time: today})
    //         for (let i = 0; i < billDetails.length; i++) {
    //             let products = await Products.find({_id: billDetails[i].product})
    //             let quantitySold = products[0].quantitySold + billDetails[i].quantity
    //             await Products.updateOne({_id: billDetails[i].product}, {quantitySold: quantitySold})
    //         }
    //         return res.status(200).json({
    //             message: "Payment success",
    //             status: true
    //         })
    //     } else if (confirm_bill[0].confirm_bill === true && confirm_bill[0].payment_status === true) {
    //         return res.status(200).json({
    //             message: "You paid for this order",
    //             status: false
    //         })
    //     } else {
    //         return res.status(200).json({
    //             message: "Waiting for merchant to confirm",
    //             status: false
    //         })
    //     }
    // }
    rejectBill = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Details.deleteMany({bills: req.body.billId})
        await Bills.deleteMany({_id: req.body.billId, account_customer: token.account_id})
        return res.status(200).json({
            message: "Delete done",
            status: true
        })
    }
}

export default new UserController()