
function get_xhr_object(in_lat, in_long) {

    var in_API_key = document.getElementById("input_field_api_key").value
    var resource = "https://api.openweathermap.org/data/2.5/weather?lat="+in_lat+"&lon="+in_long+"&appid="+in_API_key

    var x = new XMLHttpRequest();
    x.onload = loadcallback;
    x.onerror = errorcallback;
    x.onreadystatechange = statechangecallback;
    x.open("GET", resource, true);
    x.send();


    function statechangecallback() {
        //console.dir(x);
        if (x.status == "200" && x.readyState == 4) {
            //console.log(x.responseText);
            // console.log("test_1");
            show_weather(x.responseText)
        }
    }

    function errorcallback(e) {
        // console.dir(x);
        // console.dir(e);
        // console.log("test_2");
        document.getElementById("content").innerHTML = "errorcallback: check web-console";
    }

    function loadcallback() {
        // console.dir(x);
        // console.log("test_3");
        console.log(x.status);
    }    
}


function get_geolocation() {
    if (document.getElementById("input_field_api_key").value != "") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
            // console.log("test_4");
        } else {
            window.alert("Please try again")
            // console.log("test_5");
        }
    
        function showPosition(position) {
            // console.dir(position)
            // console.log("test_6");
            get_xhr_object(position.coords.latitude, position.coords.longitude)
        }
    
        function showError(error) {
            // console.log("test_7");
            console.dir(error);
            window.alert("Please agree the browser getting your position - it is necessary " + error + " RUN AGAIN")
        }   
    } else {
        window.alert("Please insert API-key")
    }
}


function show_weather(weather_json) {
    weather_json = JSON.parse(weather_json)
    console.log(weather_json)

    var table_1 = document.getElementById("table_1")
    //generate table_1
    // fill table column header
    var row = table_1.insertRow()
    row.insertCell().innerHTML = weather_json.name
    row.insertCell().innerHTML = weather_json.main.temp
    row.insertCell().innerHTML = weather_json.main.feels_like
    row.insertCell().innerHTML = weather_json.main.humidity        
    row.insertCell().innerHTML = weather_json.main.pressure   
    row.insertCell().innerHTML = weather_json.weather[0].description
    
    // `https://api.openweathermap.org/img/wn/${weather_json.weather[0].icon}@2x.png`
}
