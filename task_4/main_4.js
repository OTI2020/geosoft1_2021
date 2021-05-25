

main()
function main() {
    var start_map = create_map_with_route_and_marker()
    get_toolbar_functionality(start_map)
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
        
        // to prevent that more than one polygone gets created
        // this toolbar functionality gets hidden
        $(".leaflet-draw-toolbar-top").css("visibility", "hidden")

        var polygon_for_intersection = drawnItems.toGeoJSON()
        var out_points = get_intersection_points(routeVar, polygon_for_intersection)

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

    return intersects
}


// called by get_toolbar_functionality in case of an drawn.event
function create_weather_popups(in_map, in_points) {
    var number_of_insections = in_points.features.length
    
    for (let i=0; i<number_of_insections; i++) {
        
        var weather_marker = L.marker([in_points.features[i].geometry.coordinates[1], in_points.features[i].geometry.coordinates[0]])
        weather_marker.addTo(in_map)

        // rounded (2 decimal places) coordinates for the popup
        var x_coor = Math.round(in_points.features[i].geometry.coordinates[1]*100)/100
        var y_coor = Math.round(in_points.features[i].geometry.coordinates[0]*100)/100
        
        // marker name
        var m_name = 'marker_' + (i+1)
        console.log(m_name);

        // get data of current weather
        get_weather_data(in_points.features[i].geometry.coordinates[1], in_points.features[i].geometry.coordinates[0], weather_marker, m_name)

    }
    
}




// https://stackoverflow.com/questions/49662431/display-openweathermap-api-data-on-website-using-ajax

function get_weather_data(in_lat, in_long, in_weather_marker, in_m_name) {
    const in_API_key = '18b0849dbd5bea37f47a2a6c96946580'
    var resourse_url = "https://api.openweathermap.org/data/2.5/weather?lat="+in_lat+"&lon="+in_long+"&appid="+in_API_key

    $.ajax({
        url: resourse_url,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            /*
            console.log(data)
            console.log(data.weather[0].main)
            console.log(data.main)
            console.log(data.main.temp)
            */

            // rounded (2 decimal places) coordinates for the popup
            var x_coor = Math.round(data.coord.lon*100)/100
            var y_coor = Math.round(data.coord.lat*100)/100
        
            var weather_data = '<b> This is ' + in_m_name + '</b> <br /> coordinates(lon,lat): (' + x_coor + ','+ y_coor + ') <br /> sea level: ' + data.main.sea_level + '<br /> current Weather: ' + data.weather[0].description + '<br /> temperature: ' + data.main.temp + ' F'
            
            // fill popup with information
            in_weather_marker.bindPopup(weather_data).openPopup()
        }
    })
}


