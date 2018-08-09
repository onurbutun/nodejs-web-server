var middleware={
    requireAuthentication: function(req,res,next){
    console.log("Özel route girildi!!!");
    next();
    },
    logger: function(req,res,next){
        console.log(req.method + " "+ req.originalUrl);//Hangi isteğin çağrıldığını gösterecek(get mi, post mu gibi)
        next();
    }
   }

   module.exports=middleware;