module.exports  = function(input) {
	input = input[0]
	let numChars = 14
	let check = function(buffer) {
		for (var i = 0; i < buffer.length; i ++) {
			for(var j = i+1; j < buffer.length; j++) {
				if(buffer[i] === buffer[j]) {
					return false;
				}
			}
		}
		return true
	}
	let output = -1;
	for(var i = 0; i < input.length-numChars; i ++) {
		if (check([...input.substring(i,i+numChars)])) {
			output = i;
			break;
		}
	}
	console.log(output+numChars)
	console.log([...input.substring(output,output+numChars)])
}
