import {Request, Response} from "express";
import {Products} from "../model/product";
import {Account} from "../model/account";

export class MerChantController {
    showProducts = async (req: Request, res: Response) => {
        let account = await Account.find({username: req.params.username, role: 1})
        let products = await Products.find({account: account[0]._id, role: 1})
        return res.status(200).json(products)
    }
    createProduct = async (req: Request, res: Response) => {
        let product = req.body
        let account = await Account.find({username: req.params.username, role: 1})
        product.account = account[0]._id
        let newProduct = await Products.create(product)
        return res.status(201).json(newProduct)
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

}

export default new MerChantController()