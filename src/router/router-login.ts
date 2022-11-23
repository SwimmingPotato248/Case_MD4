import {Router} from "express";
import loginController from "../controller/login-controller";

export const routerLogin = Router()
routerLogin.post('/login', loginController.login)
routerLogin.post('/register', loginController.register)