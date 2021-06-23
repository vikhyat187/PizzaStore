function cartController(){
    return {
        index(req,res) {
           res.render('customer/cart');
        },
        update(req,res){
            // let cart = {
            //     items:{
            //         pizzaId:{
            //             item:pizzaObject,
            //             qty:0
            //         },
            //         totalQty:0,
            //         totalPrice:0
            //     }
            // }

            // for the first time session is being created
            if (!req.session.cart){
                //if the session does not have any items in cart 
                req.session.cart = {
                    items:{

                    },
                    totalQty : 0,
                    totalPrice : 0,
                }
                
            }
            let cart = req.session.cart;
            // check if the item selected is present in the cart if so add item qty or add item to the cart
            if (!cart.items[req.body._id]){
                cart.items[req.body._id]= {
                    item:req.body,
                    qty:1,
                }
                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            }
            else{
                cart.totalQty +=1;
                cart.totalPrice += req.body.price;
                //adding the individual pizza qty
                cart.items[req.body._id].qty +=1;
            }
            return res.json({ totalQty : req.session.cart.totalQty })
        }
    };
}

module.exports = cartController;