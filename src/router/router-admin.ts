import {Router} from "express";
import adminController from "../controller/admin-controller";
import {auth} from "../middleware/auth";
import {routerUser} from "./router-user";

export const routerAdmin = Router()
// routerUser.use(auth)
routerAdmin.get('/', adminController.showHome)
routerAdmin.get('/merchant', adminController.showMerchant)
routerAdmin.post('/status/:username', adminController.changeStatusMerchant)
// routerAdmin.post('/details/:username', adminController.merchantDetail)