const Order = require('../../../models/order');
const moment = require('moment');
const stripe =require('stripe')(process.env.STRIPE_PRIVATE_KEY)
function orderController(){
    return{
        store(req,res){
          
            const { phone, address,stripeToken,paymentType} = req.body;

            if (!phone || !address){
                return res.status(422).json({message: 'All fields are required'})
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address,
            })
            order.save().then(result=>{
                Order.populate(result,{path:'customerId'},(err,placedOrder)=>{

                    if (paymentType==='card'){
                        stripe.charges.create({
                            amount:req.session.cart.totalPrice*100,//it will be in paise
                            source:stripeToken,
                            currency:'inr',
                            description:`Pizza order: ${placedOrder._id}`
                        }).then(()=>{
                            placedOrder.paymentStatus=true;
                            placedOrder.paymentType=paymentType
                            placedOrder.save().then((ord)=>{
                              // emit 
                                const eventEmitter = req.app.get('eventEmitter')
                                eventEmitter.emit('orderPlaced',ord)
                                delete req.session.cart
                                return res.json({message: 'Payment successful, Order placed sucessfully'})
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }).catch(()=>{
                            delete req.session.cart
                            return res.json({message: 'Order placed but payment failed, You can pay at time of delivery'})
                        })
                    }
                    else {
                        delete req.session.cart
                        return res.json({message: 'Order placed sucessfully'})

                    }
                })

            }).catch(err=>{
                return res.status(500).json({message: 'Something went wrong😌'})
            })
        },
       async index(req,res){
            const orders = await Order.find({customerId : req.user._id},
                null,
                {sort: {'createdAt':"desc"}})
            res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
            res.render('customer/orders',{orders:orders,moment:moment});
        },
        async show(req,res){
            const order = await Order.findById(req.params.id)
            // authorise user 
            if (req.user._id.toString() === order.customerId.toString()){
               return res.render('customer/singleOrder', {order:order});
            }
            return res.redirect('/');
        },
    }
}
module.exports = orderController;