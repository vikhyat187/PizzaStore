const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest');

function initRoutes(app){

    app.get('/',homeController().index);    
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister);//we cannot have the same name in a controller
    app.post('/logout',authController().logout);//we cannot have the same name in a controller

    app.post('/update-cart',cartController().update);
    app.get('/cart',cartController().index);
}
module.exports =initRoutes;