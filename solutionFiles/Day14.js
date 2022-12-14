module.exports  = function(input) {
	let sandStart = {x: 500, y: 0};
	input = input.reduce((result, item) => {

		result.push(item.split(' -> ').reduce((lineResult, line) =>{
			line = line.split(',')
			lineResult.push({x: parseInt(line[0]), y: parseInt(line[1])})
			
			return lineResult
		}, []))
		return result
	}, [])
	let MapMaster = function() {
		this.map = []
		this.minX = 600;
		this.maxX = 0;
		this.minY = 0;
		this.maxY = 0;
		this.add = function(vec, sym) {
			if(vec.x > this.maxX) {this.maxX = vec.x}
			if(vec.x < this.minX) {this.minX = vec.x}
			if(vec.y > this.maxY) {this.maxY = vec.y}
			if(vec.y < this.minY) {this.minY = vec.y}
			if(this.map[vec.y] == undefined) {
				this.map[vec.y] = []
			}
			this.map[vec.y][vec.x] = sym;
		}
		this.addBetween = function(vec1, vec2, sym) {
			let x = vec1.x
			let y = vec1.y
			let moveX = Math.sign(vec2.x - vec1.x)
			let moveY = Math.sign(vec2.y - vec1.y)
			while ((x != vec2.x || y != vec2.y)) {
				this.add({x,y},sym);
				x += moveX;
				y += moveY;
			}
			this.add(vec2,sym);
		}
		this.check = function(vec) {
			return (this.map[vec.y] != undefined && this.map[vec.y][vec.x] != undefined) && vec.y != this.maxY + 2
		}
		this.printBetween = function(x1, x2, y1, y2) {
			console.log("")
			console.log("currentMapState:")
			for(var y = y1; y < y2; y++) {
				let line = "";
				for(var x = x1; x < x2; x++) {
					if(this.check({x,y})) { line += this.map[y][x] } else {line += " "}
				}
				console.log(line)
			}
		}
		this.print = function() {
			this.printBetween(this.minX, this.maxX, this.minY, this.maxY+5)
		}
		this.dropSand = function(location, sym) {
			let tempSendLoc = {x: location.x, y: location.y};
			let prev = null;
			while(true) {
				if(this.check({x: tempSendLoc.x, y: tempSendLoc.y+1})) {
					if(!this.check({x: tempSendLoc.x-1, y: tempSendLoc.y+1})) {
						tempSendLoc = {x: tempSendLoc.x-1, y: tempSendLoc.y+1}
						continue;
					}
					else if(!this.check({x: tempSendLoc.x+1, y: tempSendLoc.y+1})) {
						tempSendLoc = {x: tempSendLoc.x+1, y: tempSendLoc.y+1}
						continue;
					}
					else {
						this.add(tempSendLoc, sym)
						return true;
					}
				} else {
					tempSendLoc = {x: tempSendLoc.x, y: tempSendLoc.y+1}
				}
				if(tempSendLoc.y > this.maxY+10) {return false;}
			}
		}
	}
	let part1 = function(input) {
		let mapMaster = new MapMaster();
		for(var i = 0; i < input.length; i ++) {
			for(var j = 0; j < input[i].length-1; j++) {
				mapMaster.addBetween(input[i][j], input[i][j+1], "█")
			}
			
		}
		console.log(mapMaster.check({x: 500, y: 9}))
		let count = 0;
		
		while(mapMaster.dropSand(sandStart, '#')) {
			count ++;
		}
		//mapMaster.print()
		console.log(count)
	}
	let part2 = function(input) {
		let mapMaster = new MapMaster();
		for(var i = 0; i < input.length; i ++) {
			for(var j = 0; j < input[i].length-1; j++) {
				mapMaster.addBetween(input[i][j], input[i][j+1], "█")
			}
			
		}
		mapMaster.addBetween({x: 0, y: mapMaster.maxY+2}, {x: 1000, y: mapMaster.maxY+2}, "█")
		let count = 0;
		
		while(!mapMaster.check(sandStart) && count < 100000) {
			mapMaster.dropSand(sandStart, '#')
			count ++;
		}
		//mapMaster.print()
		console.log(count)
	}
	part2(input)
}
