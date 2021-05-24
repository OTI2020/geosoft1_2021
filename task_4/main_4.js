

main()
function main(){
    var map=L.map('map').setView([51, 9], 5)

    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors",
        id: "osm"
    }).addTo(map);

    var markerGEO1 = L.marker([51.969, 7.596])
    markerGEO1.addTo(map)
    markerGEO1.bindPopup("<b> Hello Tutor! <br /> GEO1 is near").openPopup()
    // console.log("markerGEO1")
    // console.log(markerGEO1)

    var myRoute = L.geoJSON(routeVar)
    myRoute.addTo(map)
    // console.log("myRoute")
    // console.log(myRoute)


    ////////////////////////////
    // here draw plugin beginns
    ////////////////////////////
    
    
    var drawnItems = L.featureGroup().addTo(map)
    console.log(drawnItems);
    console.log(L.Control.Draw);


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

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
})
}

