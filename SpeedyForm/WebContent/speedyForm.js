var jsonData;

function SpeedyAddress() {
	this.display = function(elementId) {
		var divContainer = document.createElement('div');
		divContainer.setAttribute('id', 'formContainer');
		document.getElementById(elementId).appendChild(divContainer);
		var label = document.createElement('label');
		label.setAttribute('for', 'myInput');
		label.setAttribute('id', 'myLabel');
		label.innerHTML = 'Write a country: ' + '<br/>';
		document.getElementById("formContainer").appendChild(label);
		var input = document.createElement('input');
		input.setAttribute('name', 'myInput');
		input.setAttribute('id', 'myInput');
		input.setAttribute('type', 'text');
		document.getElementById("formContainer").appendChild(input);
		var btn = document.createElement('button');
		btn.setAttribute('type', 'submit');
		btn.setAttribute('id', 'myBtn');
		btn.setAttribute('onClick', 'myFunc()');
		btn.innerHTML = 'Click me!';
		document.getElementById("formContainer").appendChild(btn);
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.innerHTML = getScriptBody() + '\n' + '$(document).ready(function(){  });';
		document.getElementById("formContainer").appendChild(script);
	};
};

function getScriptBody() {
	scriptBody = 'var jsonData = [];' +
		'$(document).ready(function(){' + 
			'$.ajax({' + 
				'url: \'http://192.168.1.100:9999/countries?callback=?\',' +
				'type: \'GET\', ' +
				'jsonpCallback: \'callback\',' +
			    'contentType: \"application/json\",' +
			    'dataType: \'jsonp\',' +
				'success: function(data) { ' +
					'for(var i = 0; i < data.length; i++) {'+
						'	jsonData[i] = data[i].name' +
						'}' +
					'$(\'#myInput\').autocomplete({' +
						'source: jsonData ' +
						','+
						'minLength: 3 });' +
				'}, ' +
				'error: function(err, textStatus, errorThrown) {' +
					'alert("Server not found");' +
			'}}); ' +
		'});';
	return scriptBody;
}

function myFunc() {
	console.log(jsonData);
}