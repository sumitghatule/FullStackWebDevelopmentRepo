const express =require("express");
const router = express.Router();

const passport =require("passport")
const User = require("../models/user")

//root route
router.get("/",(req,res)=>{
	//res.send("Landing page");
	res.render("landing");
})

//======================
//AUTH ROUTES
//========================

//show register form
router.get("/register", (req,res)=>{
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    //var newUser = new User({username: req.body.username});
    User.register( new User({username: req.body.username}), req.body.password, function(err, user){
	//User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
			console.log(err);
            req.flash("error",err.message);
            return res.render("register",{"error":err.message});
        }
        passport.authenticate("local") (req,res, function(){
	
		//passport.authenticate("local")(req,res, function(){
			req.flash("success","Welcome to YelpCamp " + user.username);
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
router.get("/login", function(req,res){
	res.render("login");
	
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),  function(req,res){
	
});

// logout route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Looged you out");
	res.redirect("/campgrounds");
});

//middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

module.exports = router;