function redvsblueShowHighscores() {
	window.openDialog('chrome://redvsblue/content/redvsblueHighscores.xul', 'redvsblue-highscore-window', 'chrome,resizable=no,dialog=yes,modal=yes,centerscreen=yes');
}

function redvsblueLaunchGame() {
	window.open('chrome://redvsblue/content/redvsblue.xul', 'redvsblue-main-window', 'chrome,resizable=no,dialog=no,modal=no');
}

function redvsblueInfo() {
	window.openDialog('chrome://redvsblue/content/redvsblueInfo.xul', 'redvsblue-info-window', 'chrome,resizable=no,dialog=yes,modal=yes,centerscreen=yes');
}

function redvsblueHighscoresName(zeit) {
	window.openDialog('chrome://redvsblue/content/redvsblueHighscoresName.xul', 'redvsblue-highscorename-window', 'chrome,resizable=no,dialog=yes,modal=yes,centerscreen=yes', zeit);
}
