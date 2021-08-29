import axios from 'axios';
import Noty from 'noty'
export function placeOrder(formObject){
   
    axios.post('/orders',formObject).then((res)=>{
        new Noty({
            theme:'relax',
            text:res.data.message,
            type:'success',
            timeout:2000,
            progressBar:false,
            layout:'topRight',
        }).show();
        setTimeout(()=>{
            window.location.href='/customer/orders'
        },1000)
    }).catch((err)=>{
        new Noty({
            theme:'relax',
            text:err.res.data.message,
            type:'error',
            timeout:2000,
            progressBar:false,
            layout:'topRight',
        }).show();
    })
}