const express = require("express"),
app 		  = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
Campground    = require("./models/campground"),
seedDB		  = require("./seeds");	  

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3",  {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
	//res.send("Landing page");
	res.render("landing");
})

//INDEX - Show all campgrounds
app.get("/campgrounds", (req,res)=>{
	//Get all campgronds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds:allCampgrounds});
		}
	});
	
	
});

//CREATE - add new campground to DB
app.post("/campgrounds", (req,res)=>{
	// get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var desc =req.body.description;
	var newCampground={name:name, image:image, description:desc}
	//campgrounds.push(newCampground);
	//create a new campground and save to DB
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
	
	
});

//NEW - show form to create new campground
app.get("/campgrounds/new",(req,res)=>{
	res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
	//find the campgrounds with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			//render show template with that campground
			res.render("show", {campground:foundCampground});
			
		}
	});
	
});

app.listen(3000, function(){
	console.log("YelpCamp Server has started!");
})