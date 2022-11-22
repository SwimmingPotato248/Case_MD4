import {Router} from "express";
import {routerUser} from "./router-user";
import {routerMerchant} from "./router-merchant";
import {routerAdmin} from "./router-admin";
import {routerLogin} from "./router-login";

export const router = Router()
router.use('/user', routerUser)
router.use('/m', routerMerchant)
router.use('/admin', routerAdmin)
router.use('/auth', routerLogin)
