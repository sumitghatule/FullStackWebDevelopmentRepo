var express= require('express');
var app=express();

//Routes
app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment!");	
});


app.get("/speak/:way",function(req,res){
	// if(req.params.way =="pig")
	// 	{
	// 		res.send("The "+ req.params.way +" says Oink");			
	// 	}
	// else if(req.params.way =="cow")
	// 	{
	// 		res.send("The "+ req.params.way +" says Moo");			
	// 	}
	// else if(req.params.way =="dog")
	// 	{
	// 		res.send("The "+ req.params.way +" say Woof Woof");			
	// 	}
	
	var sound={
		pig:"Oink",
		cow:"Moo",
		dog:"Woof Woof",
		cat:"Meow",
		goldfish:"..."
	}
	
	var way=req.params.way;
	var sound= sound[way];
	
	res.send("The "+ way + " says " + sound);
});


app.get("/repeat/:string/:repeat", function(req,res){
	var repeat=Number(req.params.repeat);
	var string=req.params.string;
	var result="";
	
	for(var i =0;i < repeat;i++){
		result+=string+ " ";
	}
	res.send(result);
})

app.get("*", function(req,res){
	res.send("Sorry, Page not found... What are you doing with your life?");
});

app.listen(3000,function(){
	console.log("server started !!");
});

