function initRoutes(app){
    
    const authController = require('../app/http/controllers/authController');
    const homeController = require('../app/http/controllers/homeController');
    const cartController = require('../app/http/controllers/customers/cartController');

    app.get('/',homeController().index);
    app.get('/cart',cartController().index);
    app.get('/login',authController().login);
    app.get('/register',authController().register);
}
module.exports =initRoutes;