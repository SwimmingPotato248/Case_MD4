import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    showAll = async (req: Request, res: Response) => {

    }
}

export default new UserController()