import {Request, Response} from "express";
import {AdminService} from "../service/admin-service";

export class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }

}

export default new AdminController()