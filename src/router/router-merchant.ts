import {Router} from "express";
import merchantController from "../controller/merchant-controller";
import {auth} from "../middleware/auth";

export const routerMerchant = Router()
routerMerchant.use(auth)
routerMerchant.get('/products', merchantController.showProducts)
routerMerchant.post('/create', merchantController.createProduct)
routerMerchant.post('/update/:productName', merchantController.updateProduct)
routerMerchant.post('/delete/:productName', merchantController.deleteProduct)
// routerMerchant.post('/search', merchantController.search)
routerMerchant.get('/shops/info', merchantController.showMyShop)
routerMerchant.post('/create/shops', merchantController.createShop)
routerMerchant.post('/update/shops/:nameShop', merchantController.updateShop)
routerMerchant.get('/bills', merchantController.showBills)
// routerMerchant.get('/bills/:billId', merchantController.showBillDetails)