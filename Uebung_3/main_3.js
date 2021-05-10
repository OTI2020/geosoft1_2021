

function get_input() {
    try {
        var API_key = document.getElementById("input_field_api_key").value
        console.log(API_key)

    } catch (error) {
        window.alert("Please insert your correct API-key")
    }
}


function get_geolocation() {
    try {
        var geolocation = 9090
        console.log("my position 🌐	" + geolocation)
    } catch (error) {
        window.alert("Please insert your correct API-key")
    }
}
/**
 * http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={API_key}
 */
