const express = require("express");
const app =express();
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

const campgrounds=[
		{name:"Salmon Creek", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"},
		{name:"Granite Hill", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441762d7fdd934ec4_340.jpg"},
		{name:"Mountain Goats Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"},
		{name:"Salmon Creek", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"},
		{name:"Granite Hill", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441762d7fdd934ec4_340.jpg"},
		{name:"Mountain Goats Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"},
		{name:"Salmon Creek", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"},
		{name:"Granite Hill", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441762d7fdd934ec4_340.jpg"},
		{name:"Mountain Goats Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2c79d09e49c659_340.jpg"}
	];
app.get("/",(req,res)=>{
	//res.send("Landing page");
	res.render("landing");
})


app.get("/campgrounds", (req,res)=>{
	
	
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req,res)=>{
	// get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name, image:image}
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
	
});

app.get("/campgrounds/new",(req,res)=>{
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("YelpCamp Server has started!");
})