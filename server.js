const express = require('express');
app = express();//contains all the functions of express
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

app.get('/',(req,res)=>{
    res.render('home');
});

//setting template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})