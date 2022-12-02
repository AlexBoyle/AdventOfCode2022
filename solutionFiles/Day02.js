module.exports  = function(input) {
	input = input.reduce((result, item) => {
		item = item.split(' ')
		result.push({inp: item[0], out: item[1]})
		return result
	}, [])
	let solu1 = function(input) {
		let score = 0; 
		for(var i = 0; i < input.length; i ++) {
			if(input[i].inp == 'A' && input[i].out == 'Z' || input[i].inp == 'B' && input[i].out == 'X' || input[i].inp == 'C' && input[i].out == 'Y') {
				score += (0 + (input[i].out == 'X' ? 1 : input[i].out == 'Y' ? 2 : input[i].out == 'Z' ? 3 : NaN))
			}
			else if(input[i].inp == 'A' && input[i].out == 'X' || input[i].inp == 'B' && input[i].out == 'Y' || input[i].inp == 'C' && input[i].out == 'Z'){
				score += (3 + (input[i].out == 'X' ? 1 : input[i].out == 'Y' ? 2 : input[i].out == 'Z' ? 3 : NaN))
			}
			else if(input[i].inp == 'A' && input[i].out == 'Y' || input[i].inp == 'B' && input[i].out == 'Z' || input[i].inp == 'C' && input[i].out == 'X'){
				score += (6 + (input[i].out == 'X' ? 1 : input[i].out == 'Y' ? 2 : input[i].out == 'Z' ? 3 : NaN))
			}
		}
		return score
	}
	let solu2 = function(input) {
		let score = 0; 
		for(var i = 0; i < input.length; i ++) {
			if(input[i].out == 'X') {
				score += (0 + (input[i].inp == 'A' ? 3 : input[i].inp == 'B' ? 1 : input[i].inp == 'C' ? 2 : NaN))
			}
			else if(input[i].out == 'Y') {
				score += (3 + (input[i].inp == 'A' ? 1 : input[i].inp == 'B' ? 2 : input[i].inp == 'C' ? 3 : NaN))
			}
			else if(input[i].out == 'Z') {
				score += (6 + (input[i].inp == 'A' ? 2 : input[i].inp == 'B' ? 3 : input[i].inp == 'C' ? 1 : NaN))
			}
		}
		return score
	}
	console.log(solu1(input))
	console.log(solu2(input))
}
