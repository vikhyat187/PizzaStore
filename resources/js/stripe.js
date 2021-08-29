import axios from 'axios';
import Noty from 'noty';
import { loadStripe } from '@stripe/stripe-js';
import { placeOrder } from './apiService';
import { CardWidget } from './CardWidget';

export async function initStripe(){
    const stripe = await loadStripe('pk_test_51JSMMFSI1iomiP03Y7G7zblICBGJhg5t10rPwziLgxaDJsx7XjW01RaUMfZzHRZGCjK5GH7F043Yrq2ZCSXnYJDl00EQJjV9eD');

    let card=null;
    function mountWidget(){

    }

    const paymentType=document.querySelector('#paymentType');
    if (!paymentType)return;
    paymentType.addEventListener('change',(e)=>{
        console.log(e.target.value);
        if (e.target.value=== 'card'){
            //display widget
            card=new CardWidget(stripe)
            card.mount()
        }else{
            card.destroy();
        }
    })
    
    //ajax call
    const paymentForm = document.querySelector('#payment-form');
    if (paymentForm){
        paymentForm.addEventListener('submit',async(e)=>{
            e.preventDefault();
            let formData = new FormData(paymentForm)
            let formObject={};
            for (let [key,value] of formData.entries()){
                formObject[key] = value;

            }
            //check if only card exists
            if (!card){
                placeOrder(formObject);
                return;
            }
                //verify card
               
            const token=await card.createToken()
            formObject.stripeToken=token.id;
            placeOrder(formObject);
           
        })
    }

}