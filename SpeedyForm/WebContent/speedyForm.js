function SpeedyAddress() {
	this.display = function(elementId) {
		
		_fillHtml(elementId);
		
		_setupUI("countries", "inputCountry");
		_setupUI("cities", "inputCity");
		
		function _setupUI(pageURL, containerID) {
			$('#' + containerID).autocomplete({
				  source: function( request, response ) {
				        $.ajax({
				          url: "http://192.168.1.100:9999/" + pageURL,
				          dataType: "jsonp",
				          data: {
				            search: request.term
				          },
				          success: function( data ) {
				            response( $.map( data, function( item ) {
				              return {
				                label: item.name,
				                value: item.name
				              };
				            }));
				          }
				        });
				     },
					minLength: 3 
			});
		}
		
		function _fillHtml(elementId) {
			var html = '<div id="formContainer">' + 
							'<label for="inputCountry">Country:</label>' +
							'<input type="text" name="inputCountry" id="inputCountry"></br>' +
							'<label for="inputCity">City:</label>' +
							'<input type="text" name="inputCity" id="inputCity">' +
						'</div>';
			
			$('#'+elementId).append(html);
			
			$('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'http://localhost:8080/SpeedyForm/style.css\'/>');
			$('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'http://localhost:8080/SpeedyForm/jquery-ui.min.css\'/>');

		}
		
	};
};