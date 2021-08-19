const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app){

    app.get('/',homeController().index);    
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister);//we cannot have the same name in a controller
    app.post('/logout',authController().logout);//we cannot have the same name in a controller
    
    app.post('/update-cart',cartController().update);
    app.get('/cart',cartController().index);

    // customer routes
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/customer/orders/:id',auth,orderController().show);

    // Admin routes
    app.get('/admin/orders',admin,AdminOrderController().index);
    app.post('/admin/order/status',admin,statusController().update);
    // app.post('/admin/order/status',admin,statusController().update)
}
module.exports =initRoutes;