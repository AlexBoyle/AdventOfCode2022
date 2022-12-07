module.exports  = function(input) {
	let fileSystem = {'/':{name: '/', type: 'dir', size: 0, children: {}}}
	let dirList = [fileSystem['/']]
	let pwd = ['']
	let workingDir = fileSystem['/']
	let getDir = function(dir) {
		let d = fileSystem['/']
		for(var i = 1; i < dir.length; i ++) {
			d = d.children[dir[i]]
		}
		return d;
	}
	let command = function(com, index, tape) {
		com = com.split(' ')
		if(com[1] === 'cd') {
			if(com[2] === '..') {
				pwd.pop()
				workingDir = getDir(pwd)
			}
			else if(com[2] === '/') {
				pwd = ['/']
				workingDir = getDir(pwd)
			}
			else {
				pwd.push(com[2])
				workingDir = getDir(pwd)
			}
			return 0;
		}
		else if (com[1] === 'ls') {
			let i = 0;
			while (tape[i+index+1] != null && !tape[i+index+1].includes('$')) {
				i++;
				let item = tape[i+index].split(' ')
				let newDir =  {name: item[1], type: item[0] === 'dir' ? 'dir' : 'file', size: item[0] === 'dir' ? 0 : parseInt(item[0]), children: {}}
				dirList.push(newDir)
				workingDir.children[item[1]] = newDir
				if(item[0] !== 'dir') {
					for(var j = 0; j < pwd.length; j ++) {
						getDir(pwd.slice(0,j+1)).size += newDir.size
					}
				}
			}
			return i;
		}
		return 0;
	}
	for(var i = 1; i < input.length; i ++) {
		i += command(input[i], i, input)
	}
	
	let pt1 = dirList.reduce((output, item) => {
		if(item.type === 'dir' && item.size <= 100000 ) {
			output+=item.size
		}
		return output
	}, 0)
	console.log("pt1: " + pt1)
	let spaceNeeded = 30000000 - (70000000 - fileSystem['/'].size)
	let finalSize = 70000000;
	for(var i = 0; i < dirList.length; i ++) {
		if(dirList[i].size >= spaceNeeded && dirList[i].size <= finalSize) {
			finalSize = dirList[i].size
		}
	}
	console.log("pt2: " + finalSize)
}
