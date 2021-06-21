const express = require('express');
app = express();//contains all the functions of express
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const initRoutes = require('./routes/web');
const mongoose= require('mongoose');

//Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("database connected");
}).catch(err=>{
    console.log("connection failed");
});

//setting the static folder( The static is a middleware)
app.use(express.static(process.cwd() + '/public/'));
// process.cwd() returns the current working directory
// __dirname return the directory name of the directory containing the JS source code file

//setting template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
// Imp the routes should come after this view engine or else it will not render the site

require("./routes/web.js")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})