This is my solution of task 4!
## Task
Create a leaflet map for this purpose.
This map should represent a layer containing the route from Route_Exercise4.geojson
https://leafletjs.com/examples.html
Extends the map with the Leaflet draw function. The user should now have the possibility to draw a bounding box (rectangular polygon
as in task 1).
Each point where the route intersects the new polygon (crosses the boundary of the polygon) should be determined and displayed as a
Leaflet marker on the map.
For these points a query for the weather should be made using the api from task 3. This
weather data should be displayed as a pop-up on the leaflet map for each associated pin.

Translated with www.DeepL.com/Translator (free version)

=======
🌤🌤🌤🌤
## Technologie
* openWeatherAPI:   https://openweathermap.org/api/one-call-api  
    * You are pleased to insert your own api-key at the beginning of the @function get_weather_data() You find it in the main.js
* Leaflet
* turf
* jquery
* ajax

### References
* http://turfjs.org/docs/#lineIntersect
* https://leafletjs.com/examples.html
* https://github.com/streuselcake/jslab
* https://leafletjs.com/reference-1.6.0.html
* https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
* also some stackoverflow pages - see in code documentaion


## contributors
@OTI2020 Gustav 

🌤🌤🌤🌤
