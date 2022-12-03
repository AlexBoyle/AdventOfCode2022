module.exports  = function(input) {
	input = input.reduce((result, item) => {
		item = item.split(' ')
		result.push({inp: item[0], out: item[1]})
		return result
	}, [])

}
