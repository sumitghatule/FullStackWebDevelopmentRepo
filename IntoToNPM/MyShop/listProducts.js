var faker= require("faker");



console.log("====================")
console.log("WELCOME TO MY SHOP")
console.log("====================")

for(let i=0;i<10;i++){
var productName = faker.commerce.productName(); // Rowan Nikolaus
var price = faker.commerce.price(); // Kassandra.Haley@erich.biz
console.log(productName + " - $" + price);
	
}


