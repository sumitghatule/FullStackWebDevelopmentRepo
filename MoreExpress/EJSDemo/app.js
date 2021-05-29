var express= require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("home.ejs");
	//res.send("<h1>Welcome to the home page!</h1><h2> Wah Wah</h2>");
});

app.get("/fallinlovewith/:thing",function(req,res){
	var thing= req.params.thing;
	res.render("love",{thingVar:thing});
	//res.send("You fell in love with "+ thing);
});

app.get("/posts", function(req,res){
	var posts = [ 
		{title:"post 1", author:"Susy" },
		{title:"post 2", author:"Charlie" },
		{title:"post 3", author:"Sumit" }
	];
	res.render("posts.ejs", {posts:posts});
});

app.listen(3000,function(){
	console.log("Server Started!")
})