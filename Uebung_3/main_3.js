

function get_input() {
    try {
        var API_key = document.getElementById("input_field_api_key").value
        console.log(API_key)

    } catch (error) {
        window.alert("Please insert your correct API-key")
    }
}
console.log(document)

function get_geolocation() {
    try {
        var geolocation = document.getElementById("timezone")
        geolocation = 9090
        console.log("my position 🌐	" + geolocation)
    } catch (error) {
        window.alert("Please search for location again")
    }
}
/**
 * api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
 */

function show_weather(weather_json) {
    document.getElementsById("date").innerHTML= "date: " + weather_json.current.dt
    document.getElementsById("temp").innerHTML= "temparature: " + weather_json.current.temp + " celsius"    
    document.getElementsById("felt_temp").innerHTML= "felt temparature: " + weather_json.current.feels_like + " celsius"    
    document.getElementsById("humidity").innerHTML= "humidity: " + weather_json.current.humidity + " %"       
    document.getElementsById("speed").innerHTML= "wind speed: " + weather_json.current.temp + " m/s"    
}
