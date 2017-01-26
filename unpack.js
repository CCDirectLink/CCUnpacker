function unpack(){
	var file = document.getElementById('file');
	file.disabled = true;
	JSZip.loadAsync(file.files[0])
	.then(function(zip) {
		window.zip = zip;
		document.getElementById('a').disabled = false;
		document.getElementById('b').disabled = false;
		document.getElementById('c').disabled = false;
		document.getElementById('d').disabled = false;
		document.getElementById('e').disabled = false;
	});
}

window.onload = function(){
	window.saveData = (function () {
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		return function (blob, fileName) {
			var url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
	}());
}

function saveAll(){
	document.getElementById('a').disabled = true;
	zip.generateAsync({type:"blob"})
	.then(function(content) {
		window.saveData(content, "crosscode.zip");
		document.getElementById('a').disabled = false;
	});
}

function saveD(){
	document.getElementById('b').disabled = true;
	zip.folder('data').generateAsync({type:"blob"})
	.then(function(content) {
		window.saveData(content, "data.zip");
		document.getElementById('b').disabled = false;
	});
}
function saveMedia(){
	document.getElementById('c').disabled = true;
	zip.folder('media').generateAsync({type:"blob"})
	.then(function(content) {
		window.saveData(content, "media.zip");
		document.getElementById('c').disabled = false;
	});
}
function saveJs(){
	document.getElementById('d').disabled = true;
	zip.folder('js').generateAsync({type:"blob"})
	.then(function(content) {
		window.saveData(content, "js.zip");
		document.getElementById('d').disabled = false;
	});
}

function saveJsPretty(){
	document.getElementById('e').disabled = true;
	zip.folder('js').file('game.compiled.js').async("string")
	.then(function (content) {
		var pretty = js_beautify(content);
		
		new JSZip().file("game.js", pretty).generateAsync({type:"blob"})
		.then(function(content) {
			window.saveData(content, "jspretty.zip");
		document.getElementById('e').disabled = false;
		});
	});
}

