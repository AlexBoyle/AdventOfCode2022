// 132 to low
// 273 to low
// 663 to high
// 651

// 1000 to high
module.exports  = function(input) {
	let crates = [[],[],[],[],[],[],[],[],[]]
	let intstuctions = []
	let setCrates = true
	for(var i = 0; i < input.length; i ++) {
		if(input[i] == '') {setCrates = false; continue;}
		if(setCrates) {
			let c = input[i].match(/.{1,4}/g);
			if(c[0].includes('1')) {continue;}
			for(var j = 0; j < c.length; j ++) {
				if(c[j].includes('[')) {
					crates[j].push(c[j].split('')[1])
				}
			}
		}
		else {
			let instTemp = input[i].split(' ');
			intstuctions.push({number: parseInt(instTemp[1]), from: parseInt(instTemp[3])-1, to: parseInt(instTemp[5])-1})
		}
		
	}
	/* Part 1
	for(var i = 0; i < intstuctions.length; i ++) {
		for(var j = 0; j < intstuctions[i].number; j++) {
			crates[intstuctions[i].to].unshift(crates[intstuctions[i].from].shift())
		}
	}
	*/
	for(var i = 0; i < intstuctions.length; i ++) {
		let toMove = []
		for(var j = 0; j < intstuctions[i].number; j++) {
			toMove.push(crates[intstuctions[i].from].shift())
			
		}
		crates[intstuctions[i].to].unshift(...toMove)

	}
	console.log(crates)
	let output = ""
	for (var i = 0; i < crates.length; i++) {
		output += crates[i][0];
	}		
	console.log(output)
}
