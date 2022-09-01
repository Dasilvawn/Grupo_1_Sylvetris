let adminis = ['Hernan', 'Jon', 'Marcos', 'Walter'];

module.exports = (req,res,next)=>{
    if(adminis.includes(req.query.user)){
        next()    
    }else{
        res.redirect('/');
    }
}