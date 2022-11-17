import {Router} from "express";
import productController from "../controller/product-controller";

const routerAdmin = Router();
routerAdmin.get('/products', productController.getAll);
routerAdmin.post('/products', productController.save)