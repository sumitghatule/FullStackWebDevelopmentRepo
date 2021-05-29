const express = require("express"),
app 		  = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
Campground    = require("./models/campground"),
Comment		  =require("./models/comment"),
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
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
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

//============================================
// COMMENTS ROUTE
//==========================================

app.get("/campgrounds/:id/comments/new", function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
	
});

app.post("/campgrounds/:id/comments", function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+ campground._id);
				}
			})
		}
	})
	//create new comment
	//connect new comment to campground
	//redirect campground show page
	
})



app.listen(3000, function(){
	console.log("YelpCamp Server has started!");
})