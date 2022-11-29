import {Router} from "express";
import adminController from "../controller/admin-controller";
import {auth} from "../middleware/auth";

export const routerAdmin = Router()
routerAdmin.use(auth)
routerAdmin.get('/', adminController.showHome)
routerAdmin.get('/merchants', adminController.showMerchant)
routerAdmin.get('/users', adminController.showUsers)
routerAdmin.post('/status', adminController.changeStatusMember)
routerAdmin.get('/upgrade', adminController.notice)
routerAdmin.post('/upgrade/:userId', adminController.acceptUpgrade)
routerAdmin.post('/reject/:userId', adminController.rejectUpgrade)
