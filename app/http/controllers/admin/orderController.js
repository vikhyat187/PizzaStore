const Order = require('../../../models/order')

function orderController(){
    return {
       async index(req,res){
           const orders= await Order.find({'status':{ $ne: 'completed'}},null,
           {sort:{'createdAt':"desc"}}).populate('customerId','-password').exec((err,orders)=>{
                if (req.xhr){
                    return res.json(orders);
                }
                return res.render('admin/orders');
           });

        }
    }
}
module.exports = orderController;