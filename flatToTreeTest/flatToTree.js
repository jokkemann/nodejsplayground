var paths = [
	{
		id: 1,
		path: 'A'
	},
	{
		id: 11,
		path: 'A|AA'
	},
	{
		id: 111,
		path: 'A|AA|AAA'
	},
	{
		id: 112,
		path: 'A|AA|AAB'
	},
	{
		id: 12,
		path: 'A|AB'
	},
	{
		id: 13,
		path: 'A|AC'
	},
	{
		id: 131,
		path: 'A|AC|ACA'
	},
	{
		id: 2,
		path: 'B'
	},
	{
		id: 21,
		path: 'B|AA'
	},
	{
		id: 211,
		path: 'B|AA|AAA'
	},
	{
		id: 2111,
		path: 'B|AA|AAA|AAAA'
	},
	{
		id: 22,
		path: 'B|AB'
	}
];

var exploded = flatToTree2(paths);

var util = require('util');
console.log(util.inspect(exploded, {showHidden: false, depth: null}));

function flatToTree(arr) {

	var exploded = [];
	var stack = [0];
	arr.forEach(function(e, i) {
		var paths = e.path.split('|');
		var currentLevel = paths.length;
		var parentId = currentLevel == 1 ? '#' : stack[currentLevel - 2];

		var newObj = {
			id: e.id,
			title: paths[paths.length - 1],
			parentId: parentId
		};
		exploded.push(newObj);
		stack[currentLevel-1] = e.id;
	});

	return exploded;
}

function flatToTree2(arr) {
	var exploded = {
		children: []
	};

	var stack = [];

	arr.forEach(function(e, i) {
		var paths = e.path.split('|');
		var currentLevel = paths.length;

		var newObj = {
			id: e.id,
			data: paths[paths.length - 1],
			children: []
		};

		if (currentLevel > 1) {
			var lastNode = stack[currentLevel-2];
			var parentNode = lastNode[lastNode.length-1];
		}
		else {
			parentNode = exploded;
		}
		parentNode.children.push(newObj);

		if (stack[currentLevel-1] == undefined)
			stack[currentLevel-1] = [];

		stack[currentLevel-1].push(newObj);

	});


	return exploded.children;
}
