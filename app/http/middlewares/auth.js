function auth(req,res,next){
    if (req.isAuthenticated()){
        return next();//process the request for login if not loggedin
    }
    res.redirect('/login');//redirect to home page
}
module.exports =auth;