const express =require("express");
const router = express.Router();
const Campground = require("../models/campground");

//INDEX - Show all campgrounds
router.get("/", (req,res)=>{
	//Get all campgronds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
		}
	});
	
	
});

//CREATE - add new campground to DB
router.post("/", (req,res)=>{
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
router.get("/new",(req,res)=>{
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id",(req,res)=>{
	//find the campgrounds with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground:foundCampground});
			
		}
	});
	
});

module.exports = router;