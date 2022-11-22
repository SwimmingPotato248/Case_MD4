import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.get('/', userController.showHomePage)
routerUser.use(auth);
routerUser.post('/:username/register', userController.registerMerchant)

