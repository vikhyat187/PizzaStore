const mongoose = require('mongoose');
const schema = mongoose.Schema;
const orderSchema = require('./order');

const userSchema = new schema({
    name :{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password :{type:String,required:true},
    role:{type:String,default:'customer'}
},{timestamps:true})


userSchema.pre('remove',function(next){
    this.model('orderSchema').remove({user:this._id},next);
})
module.exports = mongoose.model('User',userSchema);
// model - singular 
// collection - plural