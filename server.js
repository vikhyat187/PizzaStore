require('dotenv').config();
const express = require('express');
app = express();//contains all the functions of express
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const initRoutes = require('./routes/web');
const mongoose= require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');

//Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("database connected");
}).catch(err=>{
    console.log("connection failed");
});

//session config
// session acts as middleware so we have to set it
app.use(session({
    secret  : process.env.COOKIE_SECRET,
    resave : false,
    store : MongoStore.create({
        // mongoUrl:process.env.MONGO_CONNECTION_URL,
        client:connection.getClient(),//using a existing session
    }),
    saveUninitialized : false,
    cookie : { maxAge :1000 * 60 * 60 * 24}//24 hours
    // cookie : { maxAge :1000 * 15}//15 sec
}))

app.use(flash());
app.use(express.json());

//setting the static folder( The static is a middleware)
app.use(express.static(process.cwd() + '/public/'));
// process.cwd() returns the current working directory
// __dirname return the directory name of the directory containing the JS source code file

//setting a global middleware to expose the session to the front-end
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();//if its not present the loading will not be stopped
})

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