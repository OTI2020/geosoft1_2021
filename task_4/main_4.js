


main()
function main() {
    create_map_with_route_and_marker()
    insec_poly = get_toolbar_functionality()
    get_intersection_points(myRoute, insec_poly)
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
}



////////////////////////////
// here draw plugin beginns
////////////////////////////

function get_toolbar_functionality() {
    var drawnItems = L.featureGroup().addTo(map)
    console.log(drawnItems)
    // console.log(L.Control.Draw)


    map.addControl(new L.Control.Draw( {
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

    map.on(L.Draw.Event.CREATED, function (e) {
        // var type = e.layerType
        var layer = e.layer
        // add this layer to drawnItems
        drawnItems.addLayer(layer)
        console.log(drawnItems.toGeoJSON())
        
        // to prevent that more than one polygone gets created
        // this toolbar functionality gets hidden
        $(".leaflet-draw-toolbar-top").css("visibility", "hidden")
    })

    map.on('draw:edited', function (e) {
        var layers = e.layers
        layers.eachLayer(function (layer) {
        })
    })

    var polygon_for_intersection = drawnItems.toGeoJSON()
    return polygon_for_intersection

}   
    


function get_intersection_points(in_line_1, in_line_2) {
    var intersects = turf.lineIntersect(in_line_1, in_line_2)
    console.log(intersects)
    return intersects
}


