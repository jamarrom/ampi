jQuery(function() {

	jQuery.fn.googleMap = function(params) {
		params = jQuery.extend( {
			zoom : 10,
			coords : [48.895651, 2.290569],
			type : "ROADMAP",
			debug : false,
			langage : "english",
			overviewMapControl: false,
			streetViewControl: false,
			scrollwheel: false,
			mapTypeControl: false
		}, params);

		switch(params.type) {
			case 'ROADMAP':
			case 'SATELLITE':
			case 'HYBRID':
			case 'TERRAIN':
				params.type = google.maps.MapTypeId[params.type];
				break;
			default:
				params.type = google.maps.MapTypeId.ROADMAP;
				break;
		}

		this.each(function() {

			var map = new google.maps.Map(this, {
				zoom: params.zoom,
				center: new google.maps.LatLng(params.coords[0], params.coords[1]),
				mapTypeId: params.type,
				scrollwheel: params.scrollwheel,
				streetViewControl: params.streetViewControl,
				overviewMapControl: params.overviewMapControl,
				mapTypeControl: params.mapTypeControl

			});

			jQuery(this).data('googleMap', map);
			jQuery(this).data('googleLang', params.langage);
			jQuery(this).data('googleDebug', params.debug);
			jQuery(this).data('googleMarker', new Array());
			jQuery(this).data('googleBound', new google.maps.LatLngBounds());
		});

		return this;
	}

	jQuery.fn.addMarker = function(params) {
		params = jQuery.extend( {
			coords : false,
			address : false,
			url : false,
			id : false,
			icon : false,
			draggable : false,
			title : "",
			text : "",
			success : function() {}
		}, params);

		this.each(function() {
			jQuerythis = jQuery(this);

			if(!jQuerythis.data('googleMap')) {
				if(jQuerythis.data('googleDebug'))
					console.error("jQuery googleMap : Unable to add a marker where there is no map !");
					
				return false;
			}

			if(!params.coords && !params.address) {
				if(jQuerythis.data('googleDebug'))
					console.error("jQuery googleMap : Unable to add a marker if you don't tell us where !");
					
				return false;
			}

			if(params.address && typeof params.address == "string") {

				var geocodeAsync = function(jQuerythat) {

					var geocoder = new google.maps.Geocoder();

					geocoder.geocode({
						address : params.address,
						bounds : jQuerythat.data('googleBound'),
						language : jQuerythat.data('googleLang')
					}, function(results, status) {

						if (status == google.maps.GeocoderStatus.OK) {
							jQuerythat.data('googleBound').extend(results[0].geometry.location);

							if(params.icon) {
								var marker = new google.maps.Marker({
									map: jQuerythis.data('googleMap'),
									position: results[0].geometry.location,
									title: params.title,
									icon: params.icon,
									draggable: params.draggable
								});
							} else {
								var marker = new google.maps.Marker({
									map: jQuerythat.data('googleMap'),
									position: results[0].geometry.location,
									title: params.title,
									draggable: params.draggable
								});
							}

							if(params.draggable) {
								google.maps.event.addListener(marker, 'dragend', function() {
									var location = marker.getPosition();

									var coords = {};

									coords.lat = location.lat();
									coords.lon = location.lng();

									params.success(coords, jQuerythis);
								});
							}

							if(params.title != "" && params.text != "" && !params.url) {
								var infowindow = new google.maps.InfoWindow({
									content: "<h1>"+params.title+"</h1>"+params.text
								});

								var map = jQuerythat.data('googleMap');

								google.maps.event.addListener(marker, 'click', function() {
									infowindow.open(map, marker);
								});
							} else if(params.url) {
								google.maps.event.addListener(marker, 'click', function() {
									document.location = params.url;
								});
							}

							if(!params.id) {
								jQuerythat.data('googleMarker').push(marker);
							} else {
								jQuerythat.data('googleMarker')[params.id] = marker;
							}

							if(jQuerythat.data('googleMarker').length == 1) {
								jQuerythat.data('googleMap').setCenter(results[0].geometry.location);
								jQuerythat.data('googleMap').setZoom(jQuerythat.data('googleMap').getZoom());
							} else {
								jQuerythat.data('googleMap').fitBounds(jQuerythat.data('googleBound'));
							}

							var coords = {};
							coords.lat = results[0].geometry.location.lat();
							coords.lon = results[0].geometry.location.lng();
																					
							for(var i in results[0].address_components) {
								if(results[0].address_components[i].types.indexOf("postal_code") > -1) {
									coords.zipcode = results[0].address_components[i].long_name;
								}
							}

							params.success(coords, jQuerythis);

						} else {
							if(jQuerythis.data('googleDebug'))
								console.error("jQuery googleMap : Unable to find the place asked for the marker ("+status+")");
						}
					});
				}(jQuerythis);
			} else {
				jQuerythis.data('googleBound').extend(new google.maps.LatLng(params.coords[0], params.coords[1]));

        			if(params.icon) {
					var marker = new google.maps.Marker({
						map: jQuerythis.data('googleMap'),
						position: new google.maps.LatLng(params.coords[0], params.coords[1]),
						title: params.title,
						icon: params.icon,
						draggable: params.draggable
					});
				} else {
					var marker = new google.maps.Marker({
						map: jQuerythis.data('googleMap'),
						position: new google.maps.LatLng(params.coords[0], params.coords[1]),
						title: params.title,
						draggable: params.draggable
					});
				}

        			if(params.title != "" && params.text != "" && !params.url) {
          				var infowindow = new google.maps.InfoWindow({
						content: "<h1>"+params.title+"</h1>"+params.text
					});

					var map = jQuerythis.data('googleMap');

	        			google.maps.event.addListener(marker, 'click', function() {
		        			infowindow.open(map, marker);
	        			});
				} else if(params.url) {
          				google.maps.event.addListener(marker, 'click', function() {
              					document.location = params.url;
        				});
				}

				if(params.draggable) {
					google.maps.event.addListener(marker, 'dragend', function() {
						var location = marker.getPosition();

						var coords = {};

						coords.lat = location.lat();
						coords.lon = location.lng();

						params.success(coords, jQuerythis);
					});
				}

				if(!params.id) {
       					jQuerythis.data('googleMarker').push(marker);
        			} else {
        				jQuerythis.data('googleMarker')[params.id] = marker;
        			}

				if(jQuerythis.data('googleMarker').length == 1) {
					jQuerythis.data('googleMap').setCenter(new google.maps.LatLng(params.coords[0], params.coords[1]));
					jQuerythis.data('googleMap').setZoom(jQuerythis.data('googleMap').getZoom());
				} else {
					jQuerythis.data('googleMap').fitBounds(jQuerythis.data('googleBound'));
				}

				params.success({
					lat: params.coords[0],
					lon: params.coords[1]
				}, jQuerythis);
			}
		});

		return this;
	}

	jQuery.fn.removeMarker = function(id) {
		this.each(function() {
			var jQuerythis = jQuery(this);

    			if(!jQuerythis.data('googleMap')) {
    				if(jQuerythis.data('googleDebug'))
      					console.log("jQuery googleMap : Unable to delete a marker where there is no map !");
      					
      				return false;
    			}

    			var jQuerymarkers = jQuerythis.data('googleMarker');

    			if(typeof jQuerymarkers[id] != 'undefined') {
    				jQuerymarkers[id].setMap(null);
    				
      				if(jQuerythis.data('googleDebug'))
      					console.log('jQuery googleMap : marker deleted');
      					
      				return true;
    			} else {
      				if(jQuerythis.data('googleDebug'))
      					console.error("jQuery googleMap : Unable to delete a marker if it not exists !");
      		
      				return false;
    			}
		});
	}

	jQuery.fn.addWay = function(params) {
		params = jQuery.extend( {
			start : false,
			end : false,
			step : [],
			route : false,
			langage : 'english'
		}, params);

		var direction = new google.maps.DirectionsService({
			region: "fr"
		});

		var way = new google.maps.DirectionsRenderer({
			draggable: true,
			map: jQuery(this).data('googleMap'),
			panel: document.getElementById(params.route),
			provideTripAlternatives: true
		});
		
		document.getElementById.innerHTML = "";

		var waypoints = [];

    		for(var i in params.step) {
    			var step;
      			if(typeof params.step[i] == "object") {
        			step = new google.maps.LatLng(params.step[i][0], params.step[i][1]);
      			} else {
        			step = params.step[i];
      			}

      			waypoints.push({
      				location: step,
      				stopover: true
      			});
		}

		if(typeof params.end != "object") {
			var geocodeAsync = function(jQuerythat) {
				var geocoder = new google.maps.Geocoder();

		    		geocoder.geocode({
		    			address  : params.end,
		    			bounds   : jQuerythat.data('googleBound'),
		    			language : params.langage
		    		}, function(results, status) {
	        			if (status == google.maps.GeocoderStatus.OK) {
	        				var request = {
	            					origin: params.start,
	            					destination: results[0].geometry.location,
	            					travelMode: google.maps.DirectionsTravelMode.DRIVING,
	            					region: "fr",
	            					waypoints: waypoints
		        			};

		        			direction.route(request, function(response, status) {
	            					if (status == google.maps.DirectionsStatus.OK) {
	              						way.setDirections(response);
	            					} else {
	              						if(jQuerythat.data('googleDebug'))
	            							console.error("jQuery googleMap : Unable to find the place asked for the route ("+response+")");
	            					}
		        			});

	        			} else {
	          				if(jQuerythat.data('googleDebug'))
	          					console.error("jQuery googleMap : Address not found");
	        			}
		    		});
	    		}(jQuery(this));
		} else {
			var request = {
				origin: params.start,
				destination: new google.maps.LatLng(params.end[0], params.end[1]),
				travelMode: google.maps.DirectionsTravelMode.DRIVING,
				region: "fr",
				waypoints: waypoints
			};

			direction.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					way.setDirections(response);
				} else {
					if(jQuery(this).data('googleDebug'))
          					console.error("jQuery googleMap : Address not found");
				}
			});
		}

		return this;
	}
});
