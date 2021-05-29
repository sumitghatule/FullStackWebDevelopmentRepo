const mongoose=require("mongoose");
//User - emails , name
const userSchema=new mongoose.Schema({
	email: String,
	name: String,
	posts:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Post"
		}
	]
});

module.exports =mongoose.model("User",userSchema);
