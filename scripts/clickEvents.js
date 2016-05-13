function loadScript(url, callback) {
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;
	// Fire the loading
	head.appendChild(script);
}
function enigmeOnClick() {
	document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('button');
	link.addEventListener('click', function() {
			loadScript('/scripts/forceUserInput.js', setKey());
		});
	});
}
// let it shine
function bounceUp() {
	document.addEventListener('DOMContentLoaded', function() {
	var frame = document.getElementById('hidden');
	frame.addEventListener('click', function() {
		document.getElementById('hidden').style.border = '5px solid white';
		document.getElementById('list').style.background = 'transparent'
		document.getElementById('hidden').style.background = '#CCCCFF';
		$(frame).animateCssOnce('fadeInUp');
		var frame = document.getElementById('hidden');
		$(frame).animateCssOnce('rubberBand');
		});
	});
}
function textAnim(classe, effect) {
	document.addEventListener('DOMContentLoaded', function() {
	var txt = document.querySelector(classe);
	txt.addEventListener('click', function() {
		$(txt).animateCss(effect);
		});
	});
}
function imageSwitcher() {
	document.addEventListener('DOMContentLoaded', function() {
	var myImage = document.querySelector('img');
	myImage.addEventListener('click', function() {
		var mySrc = myImage.getAttribute('src');
		if (mySrc === 'images/firefox2.png') {
			myImage.setAttribute ('src','images/firefox-icon.png');
		} else {
			myImage.setAttribute ('src','images/firefox2.png');
		}
		});
	});
}
