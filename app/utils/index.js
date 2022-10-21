export function AuthGuard(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}

export function UDisplayName(req){
    if(req.user){
        return req.user.displayName;
    }
    return '';
}
