const express = require("express");

const app=express();
const request= require("request");
app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("search");
});

app.get("/results", function(req,res){
	
	console.log(req.query.search);
	//var url="http://omdbapi.com/?s="+query+"&apikey=thewdb";
	request("http://omdbapi.com/?s=texas&apikey=thewdb", function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			//res.send(results["Search"][0]);
			res.render("results", {data: data});
		}
	});
});



app.listen(3000, function(){
	console.log("Mobile app server started!");
});