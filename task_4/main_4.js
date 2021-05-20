

main()
function main(){
    var map=L.map('map').setView([51, 9], 5)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=JetIUYq8eZdZDelkpBpy', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map)

    var markerGEO1 = L.marker([51.969, 7.596])
    markerGEO1.addTo(map)
    // console.log("markerGEO1")
    // console.log(markerGEO1)

    var myRoute = L.geoJSON(routeVar).addTo(map)
    // console.log("myRoute")
    // console.log(myRoute)
}


