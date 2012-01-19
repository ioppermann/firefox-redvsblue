function Highscores() {
	this.getHighscores = function() {
		var highscores = new Array();

		for(var i = 0; i < 10; i++)
			highscores[i] = this.parseHighscore(redvsblueGetCharPref("platz" + i, ""));

		return highscores;
	}

	this.parseHighscore = function(hs) {
		if(hs.indexOf(";") == -1)
			return new Array("-1", "0", "");

		var scores = hs.split(";");

		if(scores.length != 3)
			return new Array("-1", "0", "");

		scores[0] = parseInt(scores[0]);
		scores[1] = parseInt(scores[1]);

		return scores;
	}

	this.hasHighscore = function(zeit) {
		var h = this.getHighscores();

		for(var i = 0; i < h.length; i++) {
			if(zeit <= h[i][0] || h[i][0] == -1)
				return true;
		}

		return false;
	}

	this.setHighscore = function(name, zeit) {
		if(this.hasHighscore(zeit) == false)
			return false;

		var h = this.getHighscores();

		for(var i = 0; i < h.length; i++)
			h[i][1] = 0;

		for(var i = (h.length - 2); i >= 0; i--) {
			if(zeit > h[i][0] && h[i][0] != -1) {
				h[i + 1] = new Array(zeit, 1, name);
				break;
			}
			else
				h[i + 1] = h[i];
		}

		if(h[0] == h[1])
			h[0] = new Array(zeit, 1, name);

		for(var i = 0; i < h.length; i++)
			redvsblueSetCharPref("platz" + i, h[i][0] + ";" + h[i][1] + ";" + h[i][2])

		return true;
	}
}

function redvsblueLoadHighscores() {
	var hs = new Highscores();

	var h = hs.getHighscores();

	var list = document.getElementById("highscores-list");

	var listitem = null;
	var listcell = null;

	for(var i = 0; i < h.length; i++) {
		listitem = document.createElement("listitem");

		listcell = document.createElement("listcell");
		listcell.setAttribute("label", i + 1);

		listitem.appendChild(listcell);

		listcell = document.createElement("listcell");
		listcell.setAttribute("label", h[i][2]);

		listitem.appendChild(listcell);

		listcell = document.createElement("listcell");
		if(h[i][0] != -1)
			listcell.setAttribute("label", h[i][0]);
		else
			listcell.setAttribute("label", "n/a");

		listitem.appendChild(listcell);

		listitem.appendChild(listcell);
		if(h[i][1] == 1)
			listitem.style.backgroundColor = "#C000C0";

		list.appendChild(listitem);
	}

	return true;
}

function redvsblueSetHighscore() {
	var name = document.getElementById("redvsblue-highscore-name").value;
	var zeit = window.arguments[0];

	var hs = new Highscores();

	hs.setHighscore(name, zeit);

	return true;
}
