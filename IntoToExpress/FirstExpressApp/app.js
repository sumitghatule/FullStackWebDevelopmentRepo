var express=require("express");
var app=express();


// "/" => "Hi there!"
app.get("/",function(req,res){
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
	res.send("Goodbye!!");
});

// "/dog" => "Meow!"
app.get("/dog", function(req,res){
	console.log("someone made a request to /dog");
	res.send("Meow!");
});


//subreddit r/something
app.get("/r/:subredditName", function(req,res){
	res.send("Welcome to sub reddit");
});

//another sub reddit
app.get("/r/:subredditName/comments/:id/:title", function(req,res){
	res.send("Welcome to the comment page");
});

app.get("*", function(req,res){
	res.send("You are a Star");
});


app.listen(3000, function(){
	console.log("server listening on port 3000");
});
