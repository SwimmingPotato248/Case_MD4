import {Router} from "express";
import {routerUser} from "./router-user";
import {routerMerchant} from "./router-merchant";
import {routerAdmin} from "./router-admin";
import {routerLogin} from "./router-login";

export const router = Router()
router.use('', routerUser)
router.use('', routerMerchant)
router.use('', routerAdmin)
router.use('', routerLogin)
