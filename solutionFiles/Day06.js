module.exports  = function(input) {
	input = input[0]
	let numChars = 14
	for(var i = 0; i < input.length-numChars; i ++) {
		if (((new Set([...input.substring(i,i+numChars)]))).size == numChars) {
			console.log(i+numChars)
			break;
		}
	}
}
