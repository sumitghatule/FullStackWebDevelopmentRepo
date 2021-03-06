const express =require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
var middleware = require("../middleware/index.js");


//============================================
// COMMENTS ROUTE
//==========================================
//Comments new
router.get("/new", middleware.isLoggedIn, function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
	
});

//Comments create
router.post("/",middleware.isLoggedIn, function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			req.flash("error","Something went wrong");
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success","Successfully added comment" );
					res.redirect("/campgrounds/"+ campground._id);
				}
			})
		}
	})
	//create new comment
	//connect new comment to campground
	//redirect campground show page
	
});
// Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id: req.params.id, comment: foundComment });
		}
	});
	
});

//Comment update
//--> campgrounds/:id/comments/:comment_id
router.put("/:comment_id",middleware.checkCommentOwnership, (req,res)=> {
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})
});

//Comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req,res)=>{
		//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id, function(err,foundComment){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 			//does user own the comment?
// 			if(foundComment.author.id.equals(req.user._id)){
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