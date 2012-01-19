var redvsbluestringbundle = null;

function Bubble(node) {
	this.node = node;

	this.x = 0;
	this.y = 0;

	this.vx = 0;
	this.vy = 0;
}

Bubble.prototype.initPosition = function(x, y, velocity) {
	this.setPosition(x, y);

	this.initDirection(velocity);
}

Bubble.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;

	this.node.setAttribute('left', this.x);
	this.node.setAttribute('top', this.y);
}

Bubble.prototype.initDirection = function(velocity) {
	this.vx = Math.floor((3.0 * velocity) + (Math.random() * 4.0));
	this.vy = Math.floor((3.0 * velocity) + (Math.random() * 4.0));

	if((Math.random() - 0.5) < 0)
		this.vx *= -1.0;

	if((Math.random() - 0.5) < 0)
		this.vy *= -1.0;

	return;
}

var redvsbluedata = {
	red: new Array(),
	blue: new Array(),

	left: 15,
	top: 7,
	right: 690,
	bottom: 338,

	gate: 360,
	gate_left: 343,
	gate_top: 0,
	gate_right: 362,
	gate_bottom: 62,

	stop: true,
	running: false,

	redok: 0,
	blueok: 0,

	starttime: 0
};

function redvsblueLoop() {
	var b = null;
	var x = 0;
	var y = 0;
	var left = 0;
	var right = 0;
	var top = 0;
	var bottom = 0;

	redvsbluedata.redok = 0;
	redvsbluedata.blueok = 0;

	for(var i = 0; i < 10; i++) {
		b = redvsbluedata.red[i];

		x = b.x + b.vx;
		y = b.y + b.vy;

		left = redvsbluedata.left;
		right = redvsbluedata.right;
		top = redvsbluedata.top;
		bottom = redvsbluedata.bottom;

		if((y < redvsbluedata.gate_top || y > redvsbluedata.gate_bottom) &&
			(b.x <= redvsbluedata.gate_left || b.x >= redvsbluedata.gate_right)) {
			if(b.x < redvsbluedata.gate) {
				left = redvsbluedata.left;
				right = redvsbluedata.gate_left;
			}
			else {
				left = redvsbluedata.gate_right;
				right = redvsbluedata.right;
			}
		}
		else {
			left = redvsbluedata.left;
			right = redvsbluedata.right;

			top = redvsbluedata.gate_top;
			bottom = redvsbluedata.gate_bottom;
		}

		if(x < left) {
			x = left + (left - x);
			b.vx *= -1;
		}
		else if(x > right) {
			x = right - (x - right);
			b.vx *= -1;
		}

		if(y < top) {
			y = top + (top - y);
			b.vy *= -1;
		}
		else if(y > bottom) {
			y = bottom - (y - bottom);
			b.vy *= -1;
		}

		if(x < redvsbluedata.gate_left)
			redvsbluedata.redok++;

		b.setPosition(x, y);

		b = redvsbluedata.blue[i];

		x = b.x + b.vx;
		y = b.y + b.vy;

		left = redvsbluedata.left;
		right = redvsbluedata.right;
		top = redvsbluedata.top;
		bottom = redvsbluedata.bottom;

		if((y < redvsbluedata.gate_top || y > redvsbluedata.gate_bottom) &&
			(b.x <= redvsbluedata.gate_left || b.x >= redvsbluedata.gate_right)) {
			if(b.x < redvsbluedata.gate) {
				left = redvsbluedata.left;
				right = redvsbluedata.gate_left;
			}
			else {
				left = redvsbluedata.gate_right;
				right = redvsbluedata.right;
			}
		}
		else {
			left = redvsbluedata.left;
			right = redvsbluedata.right;

			top = redvsbluedata.gate_top;
			bottom = redvsbluedata.gate_bottom;
		}

		if(x < left) {
			x = left + (left - x);
			b.vx *= -1;
		}
		else if(x > right) {
			x = right - (x - right);
			b.vx *= -1;
		}

		if(y < top) {
			y = top + (top - y);
			b.vy *= -1;
		}
		else if(y > bottom) {
			y = bottom - (y - bottom);
			b.vy *= -1;
		}

		if(x > redvsbluedata.gate_right)
			redvsbluedata.blueok++;

		b.setPosition(x, y);
	}

	if(redvsbluedata.stop == false) {
		redvsblueUpdateHUD();

		if(redvsbluedata.redok == 10 && redvsbluedata.blueok == 10) {
			redvsblueWonGame();
			return;
		}

		window.setTimeout(redvsblueLoop, 50);
	}
}

function redvsblueUpdateHUD() {
	var r = document.getElementById('redvsblue-hud-redok');
	var b = document.getElementById('redvsblue-hud-blueok');
	var m = document.getElementById('redvsblue-hud-messages');

	if(redvsbluedata.stop == false) {
		r.value = redvsbluedata.redok + ' OK';
		b.value = redvsbluedata.blueok + ' OK';
		m.value = Math.floor((Date.now() - redvsbluedata.starttime) / 1000);
	}
	else
		redvsblueResetHUD();
}

function redvsblueResetHUD() {
	var r = document.getElementById('redvsblue-hud-redok');
	var b = document.getElementById('redvsblue-hud-blueok');
	var m = document.getElementById('redvsblue-hud-messages');

	r.value = '5 OK';
	b.value = '5 OK';
	m.value = 'Press SPACE to start';
}

function redvsblueInitGame() {
	var velocity = redvsblueGetIntPref('velocity_option', 1);
	var speeds = new Array('dummy', 'normal', 'fast');
	var m = null;

	for(var i = 1; i < speeds.length; i++) {
		m = document.getElementById("redvsblue-speed-" + speeds[i]);
		if(velocity == i)
			m.setAttribute('checked', 'true');
		else
			m.removeAttribute('checked');
	}

	var img = null;
	var stack = document.getElementById('redvsblue-spielfeld-stack');

	// Den weissen Balken positionieren
	img = document.createElement("image");
	img.setAttribute("id", "bar");
	img.setAttribute("src", "chrome://redvsblue/skin/images/bar.png");
	img.setAttribute('left', '358');
	img.setAttribute('top', '7');

	stack.appendChild(img);

	for(var i = 0; i < 20; i++) {
		img = document.createElement("image");
		img.setAttribute("id", "dot_" + i);
		img.setAttribute('width', '15');
		img.setAttribute('height', '15');
		img.setAttribute('left', '0');
		img.setAttribute('top', '0');

		if(i < 10) {
			img.setAttribute("src", "chrome://redvsblue/skin/images/dot-red.png");
			redvsbluedata.red.push(new Bubble(img));
		}
		else {
			img.setAttribute("src", "chrome://redvsblue/skin/images/dot-blue.png");
			redvsbluedata.blue.push(new Bubble(img));
		}

		stack.appendChild(img);
	}

	stack.addEventListener('mousemove', function(e) {
		var n = document.getElementById('bar');
		var pos = e.pageY - 23 - 39;

		if(pos < 7)
			pos = 7;
		else if(pos > 276)
			pos = 276;

		n.setAttribute('top', pos);

		redvsbluedata.gate_top = pos;
		redvsbluedata.gate_bottom = pos + 62;
	}, false);

	redvsblueNewGame(velocity);

	return true;
}

function redvsblueQuitGame() {
	redvsbluedata.stop = true;

	return true;
}

function redvsblueStopGame() {
	redvsbluedata.stop = true;
	redvsbluedata.running = false;

	return true;
}

function redvsblueNewGame(velocity) {
	if(!velocity)
		velocity = redvsblueGetIntPref('velocity_option', 1);
	else
		redvsblueSetIntPref('velocity_option', velocity);

	redvsblueStopGame();

	var b = null;

	// Der linke Sektor
	for(var i = 0; i < 10; i++) {
		if(i < 5)
			b = redvsbluedata.red[i];
		else
			b = redvsbluedata.blue[i - 5];

		b.initPosition(16 + Math.floor(Math.random() * 326.0), 8 + Math.floor(Math.random() * 330.0), velocity);
	}

	// Der rechte Sektor
	for(var i = 0; i < 10; i++) {
		if(i < 5)
			b = redvsbluedata.red[i + 5];
		else
			b = redvsbluedata.blue[i];

		b.initPosition(363 + Math.floor(Math.random() * 326.0), 8 + Math.floor(Math.random() * 330.0), velocity);
	}

	redvsbluedata.stop = true;
	redvsbluedata.running = false;

	redvsblueResetHUD();

	return true;
}

function redvsblueStartGame() {
	if(redvsbluedata.running == true)
		return true;

	redvsbluedata.starttime = Date.now();
	redvsbluedata.stop = false;
	redvsbluedata.running = true;
	redvsblueLoop();

	return true;
}

function redvsblueWonGame() {
	redvsbluedata.stop = true;

	var h = new Highscores();
	var t = Math.floor((Date.now() - redvsbluedata.starttime) / 1000);

	if(h.hasHighscore(t) == true) {
		redvsblueHighscoresName(t);
		redvsblueShowHighscores();
	}
	else
		redvsblueShowHighscores();
}
