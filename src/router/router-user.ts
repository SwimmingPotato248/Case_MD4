import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.get('', userController.showHomePage)
routerUser.get('/shops', userController.showShop)
routerUser.get('/details/:nameShop', userController.detailsShop)
routerUser.use(auth);
// routerUser.post('/:username/register', userController.registerMerchant)

