module.exports = (req,res,next) => {
    if(req.cookies.craftsy16){
        req.session.userLogin = req.cookies.craftsy16
    }
    next()
}