function SpeedyAddress() {
	this.display = function(elementId) {
		
		_fillHtml(elementId);
		
		_setupUI("countries", "inputCountry");
		_setupUI("cities", "inputCity");
		
		function _setupUI(pageURL, containerID) {
			$('#' + containerID).autocomplete({
				  source: function( request, response ) {
					  var param;
					  if(containerID === 'inputCity')
						  param =  {
					        	  country: $("#inputCountry").val(),
					        	  search: request.term
					          };
					  else
						  param = {  search: request.term };
					  
				        $.ajax({
				          url: "http://192.168.1.100:9999/" + pageURL,
				          dataType: "jsonp",
				          data: param,
				          success: function( data ) {
				            response( $.map( data, function( item ) {
				              return {
				                label: item.name,
				                value: item.name
				              };
				            }));
				          },
				        });
				     },
					minLength: 3 
			});
		}
		
		function _fillHtml(elementId) {
			var html = '<div id="formContainer">' + 
					       '<table>' + 
					       	'<tr>' +
						        '<td><label for="inputCountry">Country:</label></td>' +
						        '<td><input type="text" name="inputCountry" id="inputCountry"></td>' +
						    '</tr>' +
						    '<tr>' +
						        '<td><label for="inputCity">City:</label></td>' +
						        '<td><input type="text" name="inputCity" id="inputCity"></td>' +
						    '</tr>' + 
						    '<tr colspan = "2">' +
						    	'<td><button type="submit" id="submitForm">Submit</button></td>' +
						    '</tr>' +
						    '</table>' +
				      '</div>';
			
			$('#'+elementId).append(html);
			
			$('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'http://localhost:8080/SpeedyForm/style.css\'/>');
			$('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'http://localhost:8080/SpeedyForm/jquery-ui.min.css\'/>');

		}
		
	};
};

function formData() {
	var jsonObject;

	jsonObject = { 'Country' : $('#inputCountry').val(), 'City' : $('#inputCity').val() };

	return JSON.stringify(jsonObject);
}