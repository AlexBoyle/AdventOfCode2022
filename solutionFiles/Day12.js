// this is fucked but I dont want to refactor it
// got the star
module.exports  = function(input) {
	let mapSource = input.reduce((result, item) =>{result.push(item.split('')); return result;}, [])
	let mapX = mapSource[0].length
	let mapY = mapSource.length
	//mapSource[20][0] = 'a'//for full input
	let output = 0;
		for(var i = 0; i < mapSource.length; i++) {
			for(var j = 0; j < mapSource[i].length; j++) {
				if(mapSource[i][j] === 'E') mapSource[i][j] = '~'
			}
		}
	let printMap = function(map) {
		console.log("")
		let temp = map.reduce((result, item) => {
			item = item.reduce((result1, item1) => {
				if(item1 === Infinity || item1 === undefined) {
					result1.push(' ___')
				}
				else {
					result1.push(item1.toString().padStart(4, ' '))
				}
				return result1
			}, []).join('')
			result.push(item)
			return result;
		}, [])
		for(var i = 0; i < temp.length; i ++) {
			console.log(temp[i])
		}
		console.log("")
	}
	let findStart = function(map) {
		let output = 0;
		for(var i = 0; i < map.length; i++) {
			for(var j = 0; j < map[i].length; j++) {
				if(map[i][j] === 'S') return {x: j, y: i}
			}
		}
	}
	let countInf = function(dist) {
		let output = 0;
		for(var i = 0; i < dist.length; i++) {
			for(var j = 0; j < dist[i].length; j++) {
				if(dist[i][j] === Infinity) output ++;
			}
		}
		return output;
	}
	
	let getValidMovesFor = function(map, {x, y}) {
		let value = map[y][x].charCodeAt(0);
		let output = [];
		if( x-1 >= 0  && value-map[y][x-1].charCodeAt(0) >= -1){ output.push({x: x-1, y}) }
		if( x+1 < mapX && value-map[y][x+1].charCodeAt(0) >= -1){ output.push({x: x+1, y}) }
		if( y-1 >= 0 && value-map[y-1][x].charCodeAt(0) >= -1){ output.push({x, y: y-1}) }
		if( y+1 < mapY && value-map[y+1][x].charCodeAt(0) >= -1){ output.push({x, y: y+1}) }
		return output
	}
	
	let dijkstra = function(map, startingNode) {
		let loopNumber = 0;
		let nodeCount = mapX * mapY;
		let distanceMap = [];
		let prevMap = [];
		let vectorListMaster = [];
		let vectorList = [];
		for(var i = 0; i < mapY; i ++) {
				distanceMap.push([])
				prevMap.push([])
			for(var j = 0; j < mapX; j ++) {
				distanceMap[i][j] = Infinity
				prevMap[i][j] = undefined
				let vector = {x: j, y: i, hasBeenVisited: false}
				vectorList.push(vector)
				vectorListMaster.push(vector)
			}
		}
		let firstNode = findStart(map)
		distanceMap[firstNode.y][firstNode.x] = 0
		map[firstNode.y][firstNode.x] = 'a'
		//
		for(var i = 0; i < map.length; i++) {
			for(var j = 0; j < map[i].length; j++) {
				if (map[i][j] === 'a') distanceMap[i][j] = 0
			}
		}
		
		
		//distanceMap[0][0] = 0
		let currentNode = vectorList[0]
		let passCount = 0;
		let numberOfNodesUnvisited = countInf(distanceMap)
		while(vectorList.length != 0) {
			
			currentNode = vectorList.shift()
			//if(currentNode.y === 20 && currentNode.x === 0) console.log("here")
			currentNode.hasBeenVisited = true;
			let vectorNeighbors = getValidMovesFor(map, currentNode);
			for(var i = 0; i < vectorNeighbors.length; i ++) {
				let alt =  distanceMap[currentNode.y][currentNode.x] + 1
				//if(currentNode.y === 20 && currentNode.x === 0) console.log(alt)
				if(alt < distanceMap[vectorNeighbors[i].y][vectorNeighbors[i].x]) {
					distanceMap[vectorNeighbors[i].y][vectorNeighbors[i].x] = alt
					prevMap[vectorNeighbors[i].y][vectorNeighbors[i].x] = currentNode;
				}
			}
			if(vectorList.length == 0 && loopNumber < 400 ) {
				vectorList = vectorListMaster.filter((item => true))

				if(numberOfNodesUnvisited === countInf(distanceMap)) {
					//break;
				}
				loopNumber++
				numberOfNodesUnvisited = countInf(distanceMap)
			}
		}
		console.log(loopNumber)
		printMap(distanceMap)
		return {distanceMap, prevMap}
	}
	printMap(mapSource)
	dijkstra(mapSource, {x: 0, y: 0})
	
}
