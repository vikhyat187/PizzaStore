function guest(req,res,next){
    if (!req.isAuthenticated()){
        return next();//process the request for login if not loggedin
    }
    res.redirect('/');//redirect to home page
}
module.exports =guest;