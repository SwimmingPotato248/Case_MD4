import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.get('/')
routerUser.use(auth);

