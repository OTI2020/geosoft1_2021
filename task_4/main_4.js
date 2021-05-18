main()
function main(){
    var map=L.map('map').setView([51, 9], 4)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=JetIUYq8eZdZDelkpBpy', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map)
    var markerGEO1 = L.marker([51.969, 7.596]).addTo(map)
    console.log("markerGEO1")
    console.log(markerGEO1)
    console.log(route_4)
    // var myLayer = L.geoJSON().addTo(map)
    // myLayer.addData(route_4)
}



// following part of geojson seems to generate error
/*
"crs": { 
    "type": "name", 
    "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } 
    },
*/