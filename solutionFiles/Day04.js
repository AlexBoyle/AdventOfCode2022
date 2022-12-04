// 132 to low
// 273 to low
// 663 to high
// 651

// 1000 to high
module.exports  = function(input) {
	input = input.reduce((result, item) => {
		item = item.split(',')
		let o = []
		for(var i = 0; i < item.length; i ++) {
			let t = item[i].split('-')
			o.push({lower: parseInt(t[0]), upper: parseInt(t[1])})
		}
		result.push(o);
		return result
	}, [])
	let contains = function(a, b) {
		return a.lower >= b.lower && a.upper <= b.upper;
	}
	let containsAtAll = function(a, b) {
		return (a.lower >= b.lower && a.lower <= b.upper) || (a.upper <= b.upper && a.upper >= b.lower);
	}
	let count1 = 0;
	let count2 = 0;
	for(var i = 0; i < input.length; i++) {
		if(contains(input[i][0], input[i][1]) || contains(input[i][1], input[i][0])) {
			count1 ++
		}
		if(containsAtAll(input[i][0], input[i][1]) || containsAtAll(input[i][1], input[i][0])) {
			count2 ++
		}
	}
	console.log(count1)
	console.log(count2)
}
