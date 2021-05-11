/**
 * this function creates the right link, we need to get weather data
 * it also makes the xhr-request
 * @function {get_xhr_object}
 * @param {Number} in_lat 
 * @param {Number} in_long 
 */
function get_xhr_object(in_lat, in_long) {

    var in_API_key = document.getElementById("input_field_api_key").value
    var resource = "https://api.openweathermap.org/data/2.5/weather?lat="+in_lat+"&lon="+in_long+"&appid="+in_API_key

    // We copied helping functions for the request 
    var x = new XMLHttpRequest();
    x.onload = loadcallback;
    x.onerror = errorcallback;
    x.onreadystatechange = statechangecallback;
    x.open("GET", resource, true);
    x.send();


    // at the end we run show_weather() with a json-obj
    function statechangecallback() {
        console.dir(x);
        console.log(x);
        // check status
        if (x.status == "200" && x.readyState == 4) {
            //console.log(x.responseText);
            // console.log("test_1");
            show_weather(x.responseText)
        }
    }

    // we have no initialisation for that case any more
    function errorcallback(e) {
        // console.dir(x);
        // console.dir(e);
        // console.log("test_2");
    }

    // last helping function for logging status
    function loadcallback() {
        // console.dir(x);
        // console.log("test_3");
        console.log(x.status);
    }    
}


/**
 * among this function several cases of behavior of the user of "Your Weather"
 * are initialisied hier
 * Furthermore we use api for getting the location 
 * @function {get_geolocation} - gets runned on click
 */
function get_geolocation() {
    if (document.getElementById("input_field_api_key").value != "") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
            // console.log("test_4");
        } else {
            window.alert("Please try again")
            // console.log("test_5");
        }
    
        // core functionality here - we need lat and lon of the json-obj
        function showPosition(position) {
            // console.dir(position)
            // console.log("test_6");
            get_xhr_object(position.coords.latitude, position.coords.longitude)
        }
    
        // we have no alternativ "default position" - so the user MUST agree 
        function showError(error) {
            // console.log("test_7");
            console.dir(error);
            window.alert("Please agree the browser getting your position - it is necessary " + error + " RUN AGAIN")
        }   
    } else {
        // if there is nothing inserted in the textfield
        window.alert("Please insert API-key")
    }
}


/**
 * function parses json first and fills table_1 after that
 * @function show_weather
 * @param {unparsed JSON} weather_json - is derived from the responseText (XHR request ...)
 */
function show_weather(weather_json) {
    weather_json = JSON.parse(weather_json)
    console.log(weather_json)

    //generate table_1
    var table_1 = document.getElementById("table_1")

    // we pic some data of json, we are interessted in
    // therefor we prepared the html file ...
    var row = table_1.insertRow()
    row.insertCell().innerHTML = weather_json.name
    row.insertCell().innerHTML = weather_json.main.temp
    row.insertCell().innerHTML = weather_json.main.feels_like
    row.insertCell().innerHTML = weather_json.main.humidity        
    row.insertCell().innerHTML = weather_json.main.pressure   
    row.insertCell().innerHTML = weather_json.weather[0].description
    
    // there was the idea of adding the fitting icon, but it did not work
    // `https://api.openweathermap.org/img/wn/${weather_json.weather[0].icon}@2x.png`
}
