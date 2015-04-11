
	function initialize() {
		var styles = [ { "stylers": [ { "visibility": "on" }, { "saturation": -100 }, { "gamma": 1 } ] },{ } ]
		
		var myLatlng = new google.maps.LatLng(41.385,2.169);
	    var mapOptions = {
	    	zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        disableDefaultUI: true,
	        draggable: false,
	        scrollwheel: false,
	        center: myLatlng,
		};
	            
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	    map.setOptions({styles: styles});
	    
	           
		var image = 'http://www.yinkle.com/themes/supergrid/img/contact_bubble.png';
		var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map,
		   icon: image,
		});
		
	}
