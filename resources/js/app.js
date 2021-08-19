import axios from 'axios';
import Noty from 'noty';
import mojs from '@mojs/core';
import {initAdmin} from './admin'
import moment from 'moment'
// socket
let socket = io()

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updatecart(pizza ){
    axios.post('/update-cart',pizza).then(res =>{
        cartCounter.innerText=res.data.totalQty;
        new Noty({
            theme:'relax',
            text:'Item added to cart 😊',
            type:'success',
            timeout:2000,
            progressBar:false,
            layout:'topRight',
            animation:{
                open:function(promise){
                    var n = this;
                    var Timeline= new mojs.Timeline();
                    var body = new mojs.Html({
                        el : n.barDom,
                        x:{500:0,delay:0,duration:500,easing:'elastic.out'},
                        isForce3d:true,
                        onComplete:function(){
                            promise(function(resolve){
                                resolve();
                            })
                        }
                    });
                    var parent = new mojs.Shape({
                        parent:n.barDom,
                        width : 200,
                        height: n.barDom.getBoundingClientRect().height,
                        radius:0,
                        x:{[150]:-150},
                        duration:1.2 *500,
                        isShowStart:true,
                    }); var burst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 10,
                        top     : n.barDom.getBoundingClientRect().height + 75,
                        degree  : 90,
                        radius  : 75,
                        angle   : {[-90]: 40},
                        children: {
                            fill     : '#EBD761',
                            delay    : 'stagger(500, -50)',
                            radius   : 'rand(8, 25)',
                            direction: -1,
                            isSwirl  : true
                        }
                    });var fadeBurst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 2,
                        degree  : 0,
                        angle   : 75,
                        radius  : {0: 100},
                        top     : '90%',
                        children: {
                            fill     : '#EBD761',
                            pathScale: [.65, 1],
                            radius   : 'rand(12, 15)',
                            direction: [-1, 1],
                            delay    : .8 * 500,
                            isSwirl  : true
                        }
                    });     Timeline.add(body, burst, fadeBurst, parent);
                    Timeline.play();
                },
                close: function (promise) {
                    var n = this;
                    new mojs.Html({
                        el        : n.barDom,
                        x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                        skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    }).play();
                }
            }
        }).show();
    }).catch(err =>{
        new Noty({
            theme:'relax',
            text:'Something went wrong 😌',
            type:'error',
            timeout:2000,
            progressBar:false,
            layout:'topRight',
            animation:{
                open:function(promise){
                    var n = this;
                    var Timeline= new mojs.Timeline();
                    var body = new mojs.Html({
                        el : n.barDom,
                        x:{500:0,delay:0,duration:500,easing:'elastic.out'},
                        isForce3d:true,
                        onComplete:function(){
                            promise(function(resolve){
                                resolve();
                            })
                        }
                    });
                    var parent = new mojs.Shape({
                        parent:n.barDom,
                        width : 200,
                        height: n.barDom.getBoundingClientRect().height,
                        radius:0,
                        x:{[150]:-150},
                        duration:1.2 *500,
                        isShowStart:true,
                    }); var burst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 10,
                        top     : n.barDom.getBoundingClientRect().height + 75,
                        degree  : 90,
                        radius  : 75,
                        angle   : {[-90]: 40},
                        children: {
                            fill     : '#EBD761',
                            delay    : 'stagger(500, -50)',
                            radius   : 'rand(8, 25)',
                            direction: -1,
                            isSwirl  : true
                        }
                    });var fadeBurst = new mojs.Burst({
                        parent  : parent.el,
                        count   : 2,
                        degree  : 0,
                        angle   : 75,
                        radius  : {0: 100},
                        top     : '90%',
                        children: {
                            fill     : '#EBD761',
                            pathScale: [.65, 1],
                            radius   : 'rand(12, 15)',
                            direction: [-1, 1],
                            delay    : .8 * 500,
                            isSwirl  : true
                        }
                    });     Timeline.add(body, burst, fadeBurst, parent);
                    Timeline.play();
                },
                close: function (promise) {
                    var n = this;
                    new mojs.Html({
                        el        : n.barDom,
                        x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                        skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                        isForce3d : true,
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    }).play();
                }
            }
        }).show();
    })

}


//we are getting the button in this and we will add event listener to it
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updatecart(pizza);
    })
})

//Remove the alert message after X seconds
const alertMsg = document.querySelector('#success-alert');
if (alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000)
}


let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value:null;
order = JSON.parse(order)
let statuses = document.querySelectorAll('.status_line')
let time = document.createElement('small')

//change order status
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('stepCompleted')
        status.classList.remove('current')
    })

    let stepCompleted = true;
    statuses.forEach((status)=>{
        let dataProp = status.dataset.status
        if (stepCompleted){
            status.classList.add('stepCompleted')
        }

        if (dataProp === order.status){
            stepCompleted=false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling){
                status.nextElementSibling.classList.add('current');
            }

        }
    })
}

updateStatus(order);


//join
if (order){
    socket.emit('join',`order_${order._id}`)
}
let adminAreaPath= window.location.pathname


if (adminAreaPath.includes('admin')){
    initAdmin(socket);
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder = {...order}
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status
    updateStatus(updatedOrder)
    new Noty({
        theme:'relax',
        text:'Order Updated 😊',
        type:'success',
        timeout:2000,
        progressBar:false,
        layout:'topRight'
    }).show();
    console.log(data)
})