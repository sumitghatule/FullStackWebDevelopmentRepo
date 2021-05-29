const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2",  {useNewUrlParser: true, useUnifiedTopology: true});

const Post=require("./models/post");
const User=require("./models/user");




Post.create({
	title:"How to cook best burger pt. 4",
	content:"Amsmlksdnklnsdlkcnsdlkcmn"
}, function(err,post){
	User.findOne({email:"sumit@gmail.com"}, function(err, foundUser){
		if(err){
			console.log(err);
		}else{
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				}else{
					console.log(data);
				}
			})
		}
	});
});

// Find User 
//Find all posts for that user

// User.findOne({email:"sumit@gmail.com"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// User.findOne({name:"Sumit Ghatule"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// User.create({
// 	email:"sumit@gmail.com",
// 	name:"Sumit Ghatule"
// });


