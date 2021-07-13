const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth')

function initRoutes(app){

    app.get('/',homeController().index);    
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister);//we cannot have the same name in a controller
    app.post('/logout',authController().logout);//we cannot have the same name in a controller
    // customer routes
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);

    app.post('/update-cart',cartController().update);
    app.get('/cart',cartController().index);

    // Admin routes
    app.get('/admin/orders',auth,AdminOrderController().index);

}
module.exports =initRoutes;