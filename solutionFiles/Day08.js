module.exports  = function(input) {
	input = input.reduce((result, item) => {
		result.push(item.split('').reduce((result1, item1) => {result1.push(parseInt(item1)); return result1}, []))
		return result
	}, [])
	let width = input.length;
	let height = input[0].length;
	let canSeeTree = function(x,y,input) {
		let canSeeT = true;
		let canSeeB = true;
		let canSeeL = true;
		let canSeeR = true;
		if(x == 0 || y == 0 || x == width-1 || y == height - 1 ) {
			return true;
		}
		else {
			for(var i = 0; i < x; i ++) {
				if(input[i][y] >= input[x][y] ) {
					canSeeT = false
				}
			}
			for(var i = x+1; i < width; i ++) {
				if(input[i][y] >= input[x][y] ) {
					canSeeB = false
				}
			}
			for(var i = 0; i < y; i ++) {
				if(input[x][i] >= input[x][y] ) {
					canSeeL = false
				}
			}
			for(var i = y+1; i < height; i ++) {
				if(input[x][i] >= input[x][y] ) {
					canSeeR = false
				}
			}
		}
		return canSeeT || canSeeB || canSeeL || canSeeR;
	}
	let getTreeScore = function(x,y,input) {
		let canSeeT = 0;
		let canSeeB = 0;
		let canSeeL = 0;
		let canSeeR = 0;
		for(var i = x-1; i > -1; i --) {
			canSeeT ++;
			if(input[x][y] <= input[i][y]) {
				break;
			}
		}
		for(var i = x+1; i < width; i ++) {
			canSeeB ++;
			
			if(input[x][y] <= input[i][y]) {
				break;
			}
		}
		for(var i = y-1; i > -1; i --) {
			canSeeL ++ 
			if(input[x][y] <= input[x][i]) {
				break;
			}
		}
		for(var i = y+1; i < height; i ++) {
			canSeeR ++ 
			if(input[x][y] <= input[x][i]) {
				break;
			}
		}
		return canSeeT * canSeeB * canSeeL * canSeeR
	}
	let count = 0;
	for(var i = 0; i < width; i ++) {
		for(var j = 0; j < height; j ++) {
			if(canSeeTree(i,j,input)) {
				count++
			}
		}
	}
	console.log(count)
	let score = 0;
	for(var i = 1; i < width-1; i ++) {
		for(var j = 1; j < height-1; j ++) {
			let tempScore = getTreeScore(i,j,input)
			if(tempScore > score) {
				score = tempScore
			}
		}
	}
	console.log(score)
}