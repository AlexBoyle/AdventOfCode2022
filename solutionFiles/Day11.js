module.exports  = function(input) {
	let monkeys = []
	let monkeyIndex = -1;
	let common = 1n;
	for(var i = 0; i < input.length; i ++) {
		if(input[i].startsWith("Monkey")) {
			monkeyIndex ++;
			monkeys.push({"id": input[i].split(" ")[1], inspectCount: 0})
		}
		else if (input[i].startsWith("Starting items: ")) {
			let temp = input[i].split("Starting items: ")[1].split(', ').reduce((result, item) =>{result.push(BigInt(parseInt(item))); return result;}, [])
			//console.log(temp)
			monkeys[monkeyIndex].items = temp || []
		}
		else if(input[i].startsWith("Operation: ")) {
			let temp = input[i].split("Operation: ")[1].split(' ')
			let tempFunc = temp[4] === 'old' ? (old) => old * old :  temp[3].includes("*") ? (old) => old * BigInt(parseInt(temp[4])) : (old) => old + BigInt(parseInt(temp[4]))
			monkeys[monkeyIndex].operation = tempFunc
		}
		else if(input[i].startsWith("Test: ")) {
			let temp = input[i].split("Test: ")[1].split(' ')
			//console.log(parseInt(temp[2]))
			monkeys[monkeyIndex].test = (num) => num % BigInt(parseInt(temp[2])) === 0n
			common = common * BigInt(parseInt(temp[2]))
		}
		else if(input[i].startsWith("If true: throw to monkey ")) {
			let temp = parseInt(input[i].split("If true: throw to monkey ")[1])
			monkeys[monkeyIndex].ifTrue = temp
		}
		else if(input[i].startsWith("If false: throw to monkey ")) {
			let temp = parseInt(input[i].split("If false: throw to monkey ")[1])
			monkeys[monkeyIndex].ifFalse = temp
		}
	}
	console.log(common)
	for(var round = 0; round < 10000 ; round ++) {
		round % 50 === 0? console.log("Round: " + round) : null;
		//console.log(round)
		for(monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex ++) {
			//console.log("--------------------------------------------")
			for(; monkeys[monkeyIndex].items.length > 0;) {
				let item = monkeys[monkeyIndex].items.shift() 
				//console.log(item)
				//console.log("insp: " + item)
				monkeys[monkeyIndex].inspectCount ++
				let toMonkey = null;
				item = monkeys[monkeyIndex].operation(item) 
				//item = Math.floor(item/3)
				//console.log(item)
				//console.log(monkeys[monkeyIndex].test(item))
				
				if(monkeys[monkeyIndex].test(item)) {
					toMonkey = monkeys[monkeyIndex].ifTrue
					
				}
				else {
					toMonkey = monkeys[monkeyIndex].ifFalse
				}
				
				//console.log("now: " + item)
				//console.log("to : " + toMonkey)
				if(item % common != 0n) {
					item = item % common
				}
				monkeys[toMonkey].items.push(item)
			}
		}
	}
	let inspectCount = []
	for(monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex ++) {
		inspectCount.push(monkeys[monkeyIndex].inspectCount)
	}
	console.log(inspectCount)
	//console.log(monkeys)
	inspectCount.sort((a,b) => b-a)
	console.log(inspectCount[0] * inspectCount[1])
}
//14481715519 to low
//2713310158  to low