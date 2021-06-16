const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityname;
 const apikey="9c85b08dd85d2d9808806efdf2437a90";
 const unit="metric";

   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
   https.get(url,function(response){
   response.on("data",function(data){
     const weatherdata=JSON.parse(data);
     const temp=weatherdata.main.temp;
     const desc=weatherdata.weather[0].description;
     console.log(temp);
     console.log(desc);
     const icon=weatherdata.weather[0].icon;
     const iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<p>The Weather is currently "+desc+" </p>");
       res.write("<h1>The Temperature of "+query+ " is "+temp+" degrees Celcius<h1>");
       res.write("<img src="+iconurl+">");
       res.send();
   });
 });
});



app.listen(3000,function(){
  console.log("server starts on port 3000");
});
