module.exports = (req,res,next) => {
   
    if(req.session.userLogin && req.session.userLogin.rol === 1){
        req.session.userLogin.dashboardUrl= process.env.DASHBOARD_URL
        next()
    }else {
        res.redirect('/')
    }
}