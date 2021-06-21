const express = require('express');
app = express();//contains all the functions of express
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
//setting the static folder( The static is a middleware)
app.use(express.static(process.cwd() + '/public/'));
// process.cwd() returns the current working directory
// __dirname return the directory name of the directory containing the JS source code file

//setting template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
// Imp the routes should come after this view engine or else it will not render the site

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/cart',(req,res)=>{
    res.render('customer/cart');
});

app.get('/login',(req,res)=>{
    res.render('auth/login');
});

app.get('/register',(req,res)=>{
    res.render('auth/register');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})