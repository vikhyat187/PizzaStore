const Order = require('../../../models/order')

function orderController(){
    return {
       async index(req,res){
           const orders= await Order.find({'status':{ $ne: 'completed'}},null,
           {sort:{'createdAt':"desc"}}).populate('customerId','-password').exec((err,orders)=>{
                res.render('admin/orders',{orders:orders});
           });
           console.log(orders);
        }
    }
}
module.exports = orderController;