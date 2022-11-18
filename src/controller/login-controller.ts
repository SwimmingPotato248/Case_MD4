import {Request, Response} from "express";
import {LoginService} from "../service/login-service";


export class LoginController {
    private loginService: LoginService

    constructor() {
        this.loginService = new LoginService()
    }

}

export default new LoginController()