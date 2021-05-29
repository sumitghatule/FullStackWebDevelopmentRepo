const express = require("express"),
app 		  = express(),
passport	  = require("passport"),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
Campground    = require("./models/campground"),
Comment		  = require("./models/comment"),
User		  = require("./models/user"),
LocalStrategy = require("passport-local"),
seedDB		  = require("./seeds");	  


mongoose.connect("mongodb://localhost/yelp_camp_v6",  {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})


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
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
	
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
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
	
});

//======================
//AUTH ROUTES
//========================

//show register form
app.get("/register", (req,res)=>{
	res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
    //var newUser = new User({username: req.body.username});
    User.register( new User({username: req.body.username}), req.body.password, function(err, user){
	//User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local") (req,res, function(){
	
		//passport.authenticate("local")(req,res, function(){
			 res.redirect("/campgrounds"); 
		});
          
    });
});

// //handle sign up logic
// app.post("/register", function(req,res){
// 	//res.send("Register");
// 	var newUser1= new User({username: req.body.username});
// 	User.register(newUser1, req.body.password, function(err,user){
// 		console.log(newUser1);
// 		console.log(req.body.password);
// 		if(err){
// 			console.log(err);
// 			return res.render("register");
// 		}
// 		console.log("Success!");
// 		console.log(user);
// 		passport.authenticate("local")(req,res, function(){
// 			res.redirect("/campgrounds");
// 		});
			
// 	});
//  });


//Show login form
app.get("/login", function(req,res){
	res.render("login");
	
})

//handling login logic
//app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),  function(req,res){
	
});

// logout route
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("YelpCamp Server has started!");
})