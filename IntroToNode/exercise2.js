function average(arr){
	var sum=0;
	for(var i=0;i<arr.length;i++){
		sum= sum+arr[i];
	}
	var avg= Math.round((sum/arr.length));
	return avg;
}

var scores=[90,98,89,100,100,86,94];
var finalAvg=average(scores);
console.log(finalAvg);