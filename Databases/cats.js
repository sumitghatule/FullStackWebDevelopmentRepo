const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true});


var catSchema = new mongoose.Schema({
  name: String,
	age:Number,
	temperament:String
});

var Cat=mongoose.model("Cat", catSchema)

//adding a new cat to the DB

// var george=new Cat({
// 	name:"Mrs. Norris",
// 	age:7,
// 	temperament:"Evil"
// });

// george.save(function(err,cat){
// 	if(err){
// 		console.log("something went wrong");
// 	} else{
// 		console.log("We just saved a cat to the DB");
// 		console.log(cat);
// 	}
// });

//Another way to create a new cat and add into DB->//adding a new cat to the DB
Cat.create({
	name:"snow ",
	age:13,
	temperament:"bland"
}, function(err,cat){
		   if(err){
			   console.log(err);
		   }else{
			   console.log(cat);
		   }
	});



//retrieve all cats from the Db and console.log each one

Cat.find({},function(err,cats){
	if(err){
		console.log("Oh No, Error!");
		console.log(err);
	}else{
		console.log("All the cats");
		console.log(cats);
	}
});

