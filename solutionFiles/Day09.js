module.exports  = function(input) {
	input = input.reduce((result, item) => {item = item.split(' ');result.push({'dir': item[0], 'dis': parseInt(item[1])});return result}, [])
	let numele = 10
	tailPositions = []
	rope = []
	for (var i = 0; i < numele; i ++) {rope.push({x: 0, y:0})}
	for(var i = 0; i < input.length; i ++) {
		for(var j = 0; j < input[i].dis; j ++) {
			if(input[i].dir === 'U')      { rope[0].y += 1 }
			else if(input[i].dir === 'D') { rope[0].y -= 1 }
			else if(input[i].dir === 'L') { rope[0].x -= 1 }
			else if(input[i].dir === 'R') { rope[0].x += 1 }
			for(var k = 0; k < rope.length-1; k ++) {
				if(rope[k].x - rope[k+1].x == 2)      { rope[k+1].x++; if(rope[k].y - rope[k+1].y >= 1){rope[k+1].y++} else if(rope[k+1].y - rope[k].y >= 1){rope[k+1].y--}}
				else if(rope[k+1].x - rope[k].x == 2) { rope[k+1].x--; if(rope[k].y - rope[k+1].y >= 1){rope[k+1].y++} else if(rope[k+1].y - rope[k].y >= 1){rope[k+1].y--}}
				else if(rope[k].y - rope[k+1].y == 2) { rope[k+1].y++; if(rope[k].x - rope[k+1].x >= 1){rope[k+1].x++} else if(rope[k+1].x - rope[k].x >= 1){rope[k+1].x--}}
				else if(rope[k+1].y - rope[k].y == 2) { rope[k+1].y--; if(rope[k].x - rope[k+1].x >= 1){rope[k+1].x++} else if(rope[k+1].x - rope[k].x >= 1){rope[k+1].x--}}
			}
			tailPositions.push(rope[numele-1].x + "X" + rope[numele-1].y)
		}
	}
	console.log(new Set(tailPositions).size)
}