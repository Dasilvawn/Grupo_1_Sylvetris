module.exports = (req,res,next) => {
    if(req.cookies.sylvestris){
        req.session.userLogin = req.cookies.sylvestris
        res.locals.userLogin = req.session.userLogin
    }
    next()
}