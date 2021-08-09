function admin(req,res,next){
    if (req.isAuthenticated() && req.user.role==='admin'){
        return next();//process the request for login if not loggedin
    }
    return res.redirect('/');//redirect to home page
}
module.exports =admin;