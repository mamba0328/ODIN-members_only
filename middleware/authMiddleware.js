module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/sign-in');
    }
}

module.exports.isMember = (req, res, next) => {
    const authorisedMember = req.isAuthenticated() && req.user.is_member;
    const authorisedNotMember = req.isAuthenticated() && !req.user.is_member;
    const nouAuthorised = !req.isAuthenticated();

    switch (true){
        case authorisedMember: {
            next();
            break
        }
        case authorisedNotMember: {
            res.redirect('/confirm-membership');
            break
        }
        case nouAuthorised: {
            res.redirect('/sign-in');
            break
        }
        default: {
            res.redirect('/sign-in');
            break
        }
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.is_admin){
        next();
    } else {
        res.status(401).json({msg: 'You\'re not authorized'});
    }
}