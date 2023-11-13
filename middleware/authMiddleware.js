module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/sign-in');
    }
}

module.exports.isMember = (req, res, next) => {
    if(req.isAuthenticated() && req.user.is_member){
        next();
    } else {
        res.redirect('/sign-in');
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.is_admin){
        next();
    } else {
        res.status(401).json({msg: 'You\'re not authorized'});
    }
}