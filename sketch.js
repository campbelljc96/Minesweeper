// Minesweeper

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var cols;
var rows;
var w = 50;
var totalBees = 15;
var win = false;


function setup() {
	cnv = createCanvas(500, 500);
	cnv.elt.addEventListener("contextmenu", (e) => e.preventDefault())
	cnv.position(5, 5);
	// put setup code here
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}

	// Pick totalBees spots
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i, j])
		}
	}

	for (var n = 0; n < totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// Deletes the spot so that it's no longer an option
		options.splice(index, 1);
		grid[i][j].bee = true;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countNeighbours();
		}
	}
}


function gameOver() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].revealed = true;
		}
	}
}

function checkAll() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].revealed == false && grid[i][j].flagged == false) {
				console.log('checked 1');
				return;
			}
			if (grid[i][j].flagged == true && grid[i][j].bee == false) {
				console.log('checked 2');
				return;
			}
		}
	}
	win = true;
	console.log('Checked all');
}


function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (mouseButton == LEFT) {
					grid[i][j].reveal();
					checkAll();
					if (grid[i][j].bee) {
						gameOver();
					}
				}
				if (mouseButton == RIGHT) {
					grid[i][j].flag();
					checkAll();
				}
			}
		}
	}
}


function draw() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
	if (win) {
		textSize(32);
		text('You win',width/2, height/2);
	}
}
