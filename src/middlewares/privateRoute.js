module.exports = (req,res,next) => req.session.userLogin ? next() : res.redirect('/usuario/login')