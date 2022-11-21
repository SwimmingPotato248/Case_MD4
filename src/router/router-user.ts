import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.get('', userController.showHomePage)
routerUser.get('/shops', userController.showShop)
routerUser.get('/:nameShop', userController.detailsShop)
routerUser.get('/details/:productName', userController.detailsProduct)
// routerUser.post('/search', userController.searchProduct)
routerUser.use(auth);
routerUser.post('/merchant/register', userController.registerMerchant)
routerUser.post('/payment', userController.payment)
