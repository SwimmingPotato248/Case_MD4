import {Request, Response} from "express";
import {MerchantService} from "../service/merchant-service";

export class MerChantController {
    private merchantService: MerchantService

    constructor() {
        this.merchantService = new MerchantService()
    }
}

export default new MerChantController()