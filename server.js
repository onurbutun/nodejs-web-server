var express=require("express");//modül expor olduğu için function olarak kullanılabiliyor.
var app=express(); //app'te artık express'in bir instance'ı var ama henüz çalışır duruma gelmedi.
var PORT=3000;
//2 şekilde middleware tanımlanır.1. application seviyesinde 2. route seviyesindedir.
//application seviyesinde tanımlanan middleware'ler her bir route'ta geçerli olur.
//application seviyesinde middleware en tepede olmalıdır. Routeların üstünde olmalıdır.
//routelardaki functionlar devreye girmeden önce yapılan işlemlrdir. Kullanıcı login olmuş mu 
//ya da log kullanılacak mı gibi işlemler için middleware kullanılır.
//requireAuthentication: function(req,res,next){ burada next bir callback functiondır. Next çağrılırsa 
//express tamam ben bu sayfada ileri gidebilirim diye hareket edecektir
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

//app.use(middleware.requireAuthentication,middleware.logger);//application seviyesinde kullanım.
app.use(middleware.logger);

//middleware'ın route seviyesinde kullanımı
app.get("/hakkimda",middleware.requireAuthentication,function(req,res){

    res.send("Hakkımda Sayfası!!!!");
})



//app'te bir get metodu oluştur, bu ne olursa olsun hangi istekle gelirse gelsin isteği al ve bu
//istek geldiğinde bir function çalıştır.
//localhost:3000 'ken hiç bir şey req edilmezse gelmesini istediğimiz mesaj.
/*app.get("/",function(req,res){

    res.send("Merhaba Express!!!");
})
*/
//req, bizim isteğimizle gelen parametreleri verir.(JSON,HEADER GİBİ)
//res, ise istek karşılandıktan sonra ne cevap verilecek onu belirtir.

app.use(express.static(__dirname+"/public")); //expressin static olan yani full path alınacak bir şeyi kullan



app.listen(PORT,function(){
    console.log("Express Server" + PORT + " nolu portta çalışıyor...");
}); //app'in çalışması için listen özelliğini kullanıyoruz 
                  // parantez içerisine port numarası yazılıyor. Yani 3000 nolu port dinlenecek.
                  