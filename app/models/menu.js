// database has menus as the table name
const mongoose= require('mongoose');
const Schema = mongoose.Schema;//this capital case refers that it will store 
// the object or constructor


//schema or blueprint
const menuSchema = new Schema({
    name: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:Number, required:true},
    size: {type:String, required:true},
})


//mongoose will always check for the model name so be careful :)
module.exports = mongoose.model('Menu',menuSchema);

