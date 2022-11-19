import {Router} from "express";
import merchantController from "../controller/merchant-controller";
import {auth} from "../middleware/auth";

export const routerMerchant = Router()
routerMerchant.use(auth)
routerMerchant.get('/:username/products', merchantController.showProducts)
routerMerchant.post('/:username/create', merchantController.createProduct)
routerMerchant.post('/:username/update/:productId', merchantController.updateProduct)
routerMerchant.post('/:username/delete/:productId', merchantController.deleteProduct)
// routerMerchant.post('/:username/search', merchantController.search)
routerMerchant.get('/:username', merchantController.showHome)
routerMerchant.post('/:username/create/shops', merchantController.createShop)
// routerMerchant.post('/:username/update/shops', merchantController.updateShop)
routerMerchant.get('/:username/bills', merchantController.showBills)
// routerMerchant.get('/:username/bills/:billId', merchantController.showBillDetails)