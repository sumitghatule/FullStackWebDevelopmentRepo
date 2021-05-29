//API Example 

// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


// const request =require('request');
// request('http://www.google.com', function(error, response,body){
// 	if(error){
// 		console.log("something went wrong");
// 		console.log(error);
		
// 	}else{
// 		if(response.statusCode ==200){
// 			//thing worked
// 			console.log(body);
// 		}
// 	}
// });


const request = require('request')


request('https://jsonplaceholder.typicode.com/users/1',function(error,response,body){
	// eval(require('locus'));
	if(!error && response.statusCode ==200){
		const parsedData= JSON.parse(body);
		console.log(parsedData.name + ' lives in '+ parsedData.address.city);

		
	}
});


// 		ES6 Synatx--> use of const, callback function arrow, template literal

request('https://jsonplaceholder.typicode.com/users/1', (error,response,body)=> {
		if(!error && response.statusCode ==200){
		const parsedData= JSON.parse(body);
	
		console.log(`${parsedData.name}  lives in  ${parsedData.address.city}`);
		}
});

//promises
const rp = require('request-promise');
rp('https://jsonplaceholder.typicode.com/users/1')
	.then((body)=> {
	const parsedData=JSON.parse(body);
	console.log(`${parsedData.name}  lives in  ${parsedData.address.city}`);
	})
	.catch((err) =>{
		console.log('Error!',err)
	});
		
