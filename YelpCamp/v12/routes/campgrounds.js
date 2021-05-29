const express =require("express");
const router = express.Router();
const Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

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
router.post("/", middleware.isLoggedIn, (req,res)=>{
	// get data from form and add to campgrounds array
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var desc =req.body.description;
	var author ={
		id:req.user._id,
		username: req.user.username
	}
	var newCampground={name:name,price:price, image:image, description:desc, author:author}
	//campgrounds.push(newCampground);
	//create a new campground and save to DB
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	})
	
	
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req,res)=>{
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

//EDIT Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res)=>{
		Campground.findById(req.params.id, function(err,foundCampground){
			res.render("campgrounds/edit",{campground: foundCampground});					
		});
});

//UPDATE Campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			//redirect somewhere (show page)
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})
	
});

//DELETE Campground router
router.delete("/:id", middleware.checkCampgroundOwnership, (req,res)=>{
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
});

//middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCampgroundOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id, function(err,foundCampground){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 			//does user own the campground?
// 			if(foundCampground.author.id.equals(req.user._id)){
// 				next();			
// 			}else{
// 				res.redirect("back");
// 				}
									
// 			}
// 		});
		
// 	}else{
// 		res.redirect("back");
// 		}
// 	}

module.exports = router;