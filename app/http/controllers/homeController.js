// inorder to fetch the data from db create a model menumodel
const menu = require('../../models/menu');
function homeController(){
     return {
        async index(req,res) {
            const pizzas =await menu.find()
            return res.render('home', { pizzas : pizzas})
        }
    }
}   

module.exports = homeController;