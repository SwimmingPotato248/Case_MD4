import {Router} from "express";
import merchantController from "../controller/merchant-controller";
import {auth} from "../middleware/auth";

export const routerMerchant = Router()
routerMerchant.use(auth)
routerMerchant.get('/products', merchantController.showProducts)
routerMerchant.post('/create', merchantController.createProduct)
routerMerchant.post('/update/:productName', merchantController.updateProduct)
routerMerchant.post('/delete/:productName', merchantController.deleteProduct)
routerMerchant.get('/shops/info', merchantController.showMyShop)
routerMerchant.post('/create/shops', merchantController.createShop)
routerMerchant.post('/update/shops/:nameShop', merchantController.updateShop)
routerMerchant.get('/bills', merchantController.showBills)
routerMerchant.post('/bills', merchantController.acceptBill)
// routerMerchant.get('/bills/:billId', merchantController.showBillDetails)
routerMerchant.post('/delete/:billId', merchantController.deleteBill)
routerMerchant.get('/bills/status/:payment_status', merchantController.filterStatusBill)
routerMerchant.post('/search/id', merchantController.searchBillById)
routerMerchant.post('/search/name', merchantController.searchBillByName)
routerMerchant.post('/search/phone', merchantController.searchBillByPhone)

// routerMerchant.post('/search/phone', merchantController.)




