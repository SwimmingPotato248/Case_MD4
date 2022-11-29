import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.get('', userController.showHomePage)
routerUser.get('/shops', userController.showShop)
routerUser.get('/shops/:nameShop', userController.detailsShop)
routerUser.get('/products/:productName', userController.detailsProduct)
routerUser.post('/search', userController.searchProduct)
routerUser.post('/category', userController.createCategory)
routerUser.get('/category', userController.getCategory)
routerUser.get('/category-products', userController.getCategoryProducts)
routerUser.post('/category-products', userController.CategoryProducts)
routerUser.get('/category/:categoryId', userController.findByCategory)

routerUser.use(auth);
routerUser.post('/u/merchant/register', userController.submitToMerchant)
routerUser.get('/notice', userController.showNotice)
routerUser.get('/bills', userController.showMyBills)
routerUser.get('/bills/:billId', userController.billDetails)
routerUser.post('/confirm', userController.confirmBills)
// routerUser.post('/payment', userController.payment)
routerUser.post('/reject', userController.rejectBill)
