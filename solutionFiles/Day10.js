module.exports  = function(input) {
	input = input.reduce((result, item) => {item = item.split(' ');result.push({'command': item[0], 'number': parseInt(item[1])});return result}, [])
	let commandIndex = 0, cycleCounter = 0, register = 1; 
	let doNext = null;
	let screen = []
	while (commandIndex < input.length) {
		let skip = false
		cycleCounter ++
		// Cycle
		if(input[commandIndex].command === 'noop' || doNext != null) {
			commandIndex ++;
		}
		else if(input[commandIndex].command === 'addx') {
			doNext = input[commandIndex];
			skip = true;
		}
		// Screen processing
		screen.push((cycleCounter-1)%40 >= register-1 && (cycleCounter-1)%40 <= register + 1 ? '█' : ' ')
		if((cycleCounter)%40 === 0) {
			console.log(screen.join(''))
			screen = [];
		}
		// Post Cycle
		if(doNext != null && !skip) {
			register += doNext.number;
			doNext = null;	
		}
	}
}