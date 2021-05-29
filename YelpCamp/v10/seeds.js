var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;



//=======================================================================================
// Same above function implemented using ASYNC AWAIT
//========================================================================================

// async function seedDB(){
// 	try{
// 		await Campground.remove({});
// 		console.log("Campgrounds Removed");
// 		await Comment.remove({});
// 		console.log("Comments Removed");
		
// 		for(const d of data){
// 			let campground = await Campground.create(d);
// 			console.log("Campground created");
// 			let comment = await Comment.create(
// 				{
// 					text: "This place is great, but I wish there was internet",
//                     author: "Homer"
					
// 				}
// 			)
// 			console.log("Comment created");
			
// 			campground.comments.push(comment);
// 			campground.save();
// 			console.log("Comment added to campground");
			
// 		}
// 	}catch(err){
// 		console.log(err);
// 	}
// }
// module.exports = seedDB;



//=============================================================================================
// Wrote by Me from colt Video
//================================================================================================
// const mongoose =require("mongoose");
// const Campground= require("./models/campground");
// const Comment=require("./models/comment");

// var data= [
// 	{
// 		name:"Cloud's Rest",
// 		image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c7d2c7ed59245cd51_340.jpg",
// 		description:"blah blah blah"
// 	},
// 	{
// 		name:"Desert Mesa",
// 		image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c7ed59245cd51_340.jpg",
// 		description:"blah blah blah"
// 	},
// 	{
// 		name:"Canyon Floor",
// 		image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7ed59245cd51_340.jpg",
// 		description:"blah blah blah"
// 	}
// ]

// function seedDB(){
// 	Campground.remove({},function(err){
// 	if(err){
// 		console.log(err);
// 	}
// 	console.log("remove campgrounds!");
// 			//Add a few Campground
// 		data.forEach(function(seed){
// 			Campground.create(seed,function(err,campground){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log("added a campground");
// 					//Add a few comment
// 					Comment.create(
// 						{
// 							text:"This place is great, but I wish there was a internet",
// 							author: "Homer"
// 						}, function(err,comment){
// 							if(err){
// 								console.log(err);
// 							}else{
// 								campground.comment.push(comment);
// 								campground.save();
// 								console.log("Created new comment");
// 							}
							
// 						});
// 				}
// 			});
// 		});
// 	});
	

	
// }

// module.exports=seedDB;