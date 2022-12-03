require('../utilitys')
module.exports  = function(input) {
	let part1 = function(input) {
		input = input.reduce((result, item) => {
			let index = item.length/2
			item = [item.slice(0, index), item.slice(index)]
			result.push(item)
			return result
		}, [])
		let sum = 0;
		for(var i = 0; i < input.length; i ++) {
			let letter = [...utility.intersect(input[i][0], input[i][1])][0];
			if (letter === letter.toLowerCase()) {
			  sum += (letter.charCodeAt(0)-96)
			}
			else {
			  sum += (letter.charCodeAt(0)-64)+26
			}
		}
		return sum
	}
	
	let part2 = function(input) {	
		let sum = 0;
		let group = []
		for(var i = 0; i < input.length; i ++) {
			group.push(input[i])
			if((i+1)%3==0) {
				let letter = [...utility.intersect(...group)][0];
				if (letter === letter.toLowerCase()) {
				  sum += (letter.charCodeAt(0)-96)
				}
				else {
				  sum += (letter.charCodeAt(0)-64)+26
				}
				group = []
			}
		}
		return sum
	}
	console.log(part1(input))
	console.log(part2(input))
}
