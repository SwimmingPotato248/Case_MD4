import {Router} from "express";
import loginController from "../controller/login-controller";


export const routerLogin = Router()
routerLogin.post('/register', loginController.register)
routerLogin.post('/login', loginController.login)