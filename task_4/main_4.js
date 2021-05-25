


main()
function main() {
    var start_map = create_map_with_route_and_marker()
    // var insec_points = 
    get_toolbar_functionality(start_map)
    // insec_points
}



function create_map_with_route_and_marker() {
    var map=L.map('map').setView([51, 9], 5)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors",
        id: "osm"
    }).addTo(map)

    var markerGEO1 = L.marker([51.969, 7.596])
    markerGEO1.addTo(map)
    markerGEO1.bindPopup("<b> Hello Tutor! <br /> GEO1 is near").openPopup()
    // console.log("markerGEO1")
    // console.log(markerGEO1)

    var myRoute = L.geoJSON(routeVar)
    myRoute.addTo(map)
    // console.log("myRoute")
    // console.log(myRoute)

    return map
}



/**
 * here draw plugin beginns
 * @function get_toolbar_functionality()
 * @param {Leaflet-Map} in_map 
 * @returns intersects - is a geojson that contains drawn rectangle
 */
function get_toolbar_functionality(in_map) {
    var drawnItems = L.featureGroup().addTo(in_map)
    console.log("drawnItems")
    console.log(drawnItems)
    // console.log(L.Control.Draw)


    in_map.addControl(new L.Control.Draw( {
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polyline: false,
            polygon: false,
            marker: false,
            circle:false,
            rectangle: true
        }
    }))

    
    in_map.on(L.Draw.Event.CREATED, function (e) {
        // var type = e.layerType
        var layer = e.layer
        // add this layer to drawnItems
        drawnItems.addLayer(layer)
        console.log("drawnItems.toGeoJSON()")
        console.log(drawnItems.toGeoJSON())
        
        // to prevent that more than one polygone gets created
        // this toolbar functionality gets hidden
        $(".leaflet-draw-toolbar-top").css("visibility", "hidden")

        var polygon_for_intersection = drawnItems.toGeoJSON()
        var out_points = get_intersection_points(routeVar, polygon_for_intersection)
        console.log("out_points")
        console.log(out_points)

        create_weather_popups(in_map, out_points)
    })

    in_map.on('draw:edited', function (e) {
        var layers = e.layers
        layers.eachLayer(function (layer) {
        })
    })
}   
    


// called by get_toolbar_functionality in case of an drawn.event
function get_intersection_points(in_line_1, in_line_2) {
    var intersects = turf.lineIntersect(in_line_1, in_line_2)
    console.log("intersects");
    console.log(intersects)
    return intersects
}


// called by get_toolbar_functionality in case of an drawn.event
function create_weather_popups(in_map, in_points) {
    var number_of_insections = in_points.features.length
    console.log(number_of_insections + "number_of_insections");
    
    for (let i=0; i<number_of_insections; i++) {
        
        var weather_marker = L.marker([in_points.features[i].geometry.coordinates[1], in_points.features[i].geometry.coordinates[0]])
        weather_marker.addTo(in_map)

        // rounded (2 decimal places) coordinates for the popup
        var x_coor = Math.round(in_points.features[i].geometry.coordinates[1]*100)/100
        var y_coor = Math.round(in_points.features[i].geometry.coordinates[0]*100)/100
        
        // marker names
        var m_name = 'marker_' + (i+1)
        weather_marker.bindPopup("<b> This is " + m_name + "<br /> coordinates: (" + x_coor + ", " + y_coor + ") <br />").openPopup()

    }
    
}




/*
let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly,daily&appid=" + weatherApi+"&units=metric"
    $.ajax({
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(result){
            console.log(result.current.temp);
            let weather = "<b>current Weather:</b><br>" +result.current.weather[0].description + "<br>" + result.current.temp + "°C";
            console.log(weather);
            marker.bindPopup(weather).openPopup();
        }
    }).done(function() {
        $( this ).addClass( "done" );
      });
*/

