import {Router} from "express";
import {routerUser} from "./router-user";
import {routerMerchant} from "./router-merchant";
import {routerAdmin} from "./router-admin";

export const router = Router()
router.use('', routerUser)
router.use('', routerMerchant)
router.use('', routerAdmin)
