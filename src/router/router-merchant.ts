import {Router} from "express";
import merchantController from "../controller/merchant-controller";
import {auth} from "../middleware/auth";
import {routerUser} from "./router-user";

export const routerMerchant = Router()
routerUser.use(auth)
routerMerchant.get('/:username/products', merchantController.showProducts)
routerMerchant.post('/:username/create', merchantController.createProduct)
routerMerchant.post('/:username/update/:productId', merchantController.updateProduct)
routerMerchant.post('/:username/delete/:productId', merchantController.deleteProduct)
