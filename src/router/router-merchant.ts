import {Router} from "express";
import merchantController from "../controller/merchant-controller";
import {auth} from "../middleware/auth";

export const routerMerchant = Router()
routerMerchant.use(auth)
routerMerchant.get('/products', merchantController.showProducts)
routerMerchant.post('/create', merchantController.createProduct)
routerMerchant.post('/update/:productId', merchantController.updateProduct)
routerMerchant.post('/delete/:productId', merchantController.deleteProduct)
// routerMerchant.post('/search', merchantController.search)
routerMerchant.get('', merchantController.showHome)
routerMerchant.post('/create/shops', merchantController.createShop)
// routerMerchant.post('/update/shops', merchantController.updateShop)
routerMerchant.get('/bills', merchantController.showBills)
// routerMerchant.get('/bills/:billId', merchantController.showBillDetails)
routerMerchant.post('/delete/:billId', merchantController.deleteBill)
routerMerchant.get('/bills/status/:payment_status', merchantController.filterStatusBill)
routerMerchant.post('/search/:id', merchantController.searchBillById)
routerMerchant.post('/search/name/:username', merchantController.searchBillByName)
routerMerchant.post('/search/phone/:phoneNumber', merchantController.searchBillByPhone)



