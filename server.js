const express = require('express');
app = express();//contains all the functions of express
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
//setting the static folder( The static is a middleware)
app.use(express.static(process.cwd() + '/public/'));
// process.cwd() returns the current working directory
// __dirname return the directory name of the directory containing the JS source code file
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