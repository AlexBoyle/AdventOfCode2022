module.exports  = function(input) {
		let counts = [0]
		let index = 0;
		for(var i = 0; i < input.length; i ++) {
			if(input[i] == "") {
				index ++;
				counts[index] = 0;

			}
			else {
				counts[index] += parseInt(input[i]);
			}
		}
		counts.sort()
		console.log(counts)
		console.log(counts.length)
		console.log(index)
		console.log("")
		console.log(counts[index])
		console.log(counts[index-1])
		console.log(counts[index-2])
		console.log(counts[index-3])
		console.log(counts[index-4])
		
}

69912+69741+68527