const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo",  {useNewUrlParser: true, useUnifiedTopology: true});

//Post --title,content
const postSchema =new mongoose.Schema({
	title: String,
	content:String
});
const Post =mongoose.model("postModel", postSchema);

//User - emails , name
const userSchema=new mongoose.Schema({
	email: String,
	name: String,
	posts:[postSchema]
});
const User =mongoose.model("User",userSchema);


// const newUser= new User({
// 	email:"rsg96@txstate.edu",
// 	name:"Rohit Ghatule"
// });


// newUser.posts.push({
// 	title:"How to prepare for UPSC",
// 	content:"Just kidding. Go to class to learn it!"
// })

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// const newPost=new Post({
// 	title:"Reflections on Apples",
// 	content:"They are delicious"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"Rohit Ghatule"}, (err,user)=>{
	if(err){
		// console.log(err);
	} else{
		user.posts.push({
			title:"3 Things I really hate",
			content:"Voldemort. Voldemort. Voldemort"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}else{
				console.log(user);
			}
		})
	}
});

