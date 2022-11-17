import {Request,Response} from "express";
import {Product} from "../model/product";

class ProductController {
    getAll = async (req: Request,res: Response) =>{
        let products = await Product.find();
        return res.status(200).json(products)
    }

    save = async (req: Request,res: Response) => {
        let product = await Product.create(req.body);
        await product.save()
        return res.status(200).json(product);
    }
}

export default new ProductController()