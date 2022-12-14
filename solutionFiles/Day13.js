// this is fucked but I dont want to refactor it
// got the star
module.exports  = function(input) {
	let compare = function(left, right) {
		let output = false;
		if(typeof left !== 'object' ) {left = [left]}
		else if(typeof right !== 'object' ) {right = [right]}
		for(var i = 0; i < left.length; i ++) {
			if(typeof left[i] == 'number' && typeof right[i] == 'number') {
				if(left[i] == right[i]) {continue;}
				if(left[i] < right[i]) {return true;}
				else if(left[i] > right[i]) {return false;}
				else {return false;}
			}
			else if(right[i] === undefined) {return false;}
			else if(typeof left[i] === 'object' && typeof right[i] !== 'object'){let compareRes = compare(left[i], [right[i]]); if(compareRes === undefined) {continue;} return compareRes}
			else if(typeof left[i] !== 'object' && typeof right[i] === 'object'){let compareRes = compare([left[i]], right[i]); if(compareRes === undefined) {continue;} return compareRes}
			else if(typeof left[i] === 'object' && typeof right[i] === 'object'){let compareRes = compare(left[i], right[i]);   if(compareRes === undefined) {continue;} return compareRes}
			else {return false}
		}
		if(left.length < right.length) {return true}
		return undefined;
	}
	let part1 = function(input) {
		input = input.reduce((result, item) => {
			if(item != '') {
				result[result.length-1].push(eval(item));
			}
			else {
				result.push([])
			}
			return result;
		}, [[]])
		let output = 0
		for(var i = 0; i < input.length; i ++) {
			let compareRes = compare(input[i][0], input[i][1]);
			if(compareRes == undefined) {
				output += i+1
			}
			else if(compareRes){
				output += i+1
			}
		}
		console.log(output)
	}
	let part2 = function(input) {
		let ref1 = [[2]];
		let ref2 = [[6]];
		input = input.reduce((result, item) => {
			if(item != '') {
				result.push(eval(item));
			}
			
			return result;
		}, [ref1,ref2])
		input.sort((a,b) => compare(a,b)? -1: 1)
		let ref1Index = input.indexOf(ref1)+1
		let ref2Index = input.indexOf(ref2)+1
		console.log({ref1Index, ref2Index})
		console.log(ref1Index * ref2Index)
	}
	console.log("part1")
	part1(input)
	console.log("")
	console.log("part2")
	part2(input)
}
