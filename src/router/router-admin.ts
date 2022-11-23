import {Router} from "express";
import adminController from "../controller/admin-controller";
import {auth} from "../middleware/auth";

export const routerAdmin = Router()
// routerAdmin.use(auth)
routerAdmin.get('/', adminController.showHome)
routerAdmin.get('/list/merchants', adminController.showMerchant)
routerAdmin.post('/status/:username', adminController.changeStatusMerchant)
routerAdmin.get('/list/user', adminController.showListUser)
routerAdmin.post('/search/:product', adminController.quickSearchProduct)



// routerAdmin.post('/status/:username', adminController.acceptMerchant)
// routerAdmin.get('/merchants/:username', adminController.merchantDetail)