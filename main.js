function showMenu() {
	const menuDiv = document.getElementById('menu-div');
	menuDiv.style.visibility = "visible";
	menuDiv.style.opacity = "0.75";
	menuDiv.style.backdropFilter = "blur(200px)";
}

function hideMenu() {
	const menuDiv = document.getElementById('menu-div');
	menuDiv.style.backdropFilter = "blur(0px)";
	menuDiv.style.opacity = "0";
	menuDiv.style.visibility = "hidden";
}
