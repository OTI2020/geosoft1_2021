/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 0.8.0 - finished
 */


/**
 * only for testing if lat and lon are swapped
 * function swapps lat and lon
 * @function change_lat_lon
 * @param {Array} in_point
 * @returns {Array}
 */
function change_lat_lon(in_point) {
    var temp = in_point[0]
    in_point[0] = in_point[1]
    in_point[1] = temp

    return in_point
}


/**
 * this calculations base on a sphere as representation
 * of the earth so we have errors up to 0.3%, because 
 * the earth is a little elliptic. 
 * Each point-coordinates represent one latitude and one 
 * longitude.
 * @function calculate_distance_between_2_points
 * @param {Array} in_pointA - two points as arrays
 * @param {Array} in_pointB
 * @return {float} - returns the distance between pointA 
 * and PointB
 * Algorithim like this: 
 * https://www.movable-type.co.uk/scripts/latlong.html
 */
 function calculate_distance_between_2_points(in_pointA, in_pointB) {
    const p = Math.PI/180 // PI/180 is ca. 0.017453292519943295
    const R = 6371e3; // R is earth’s radius (mean radius = 6,371 km)
    var c = Math.cos // cosisnus
    var s = Math.sin // sinus
    var at = Math.atan2 // arctan2

    var lat1 = in_pointA[1] // latitude of pointA
    var lon1 = in_pointA[0] // longitude of pointA
    var lat2 = in_pointB[1] // latitude of pointB
    var lon2 = in_pointB[0] // longitude of pointB
    
    // multiplication with p to convert from degree to radian
    // for the use in trigonomic functions
    const phi1 = lat1 * p
    const phi2 = lat2 * p

    // delta phi means difference between both latitudes and
    // delta lambda difference between both longitudes
    const delPhi = (lat2-lat1) * p 
    const delLam = (lon2-lon1) * p 
    
    // trigonometic calculations for geodetic purpose
    // base on the haversine formula
    const partA = s(delPhi/2)*s(delPhi/2) + c(phi1)*c(phi2)*s(delLam/2)*s(delLam/2)
    const partB = 2*at(Math.sqrt(partA), Math.sqrt(1-partA))
    const dist = R * partB // in metres

    // returns distance between the both input points
    return dist
}


/**
 * The edges of the given polygon are parallel to the latitudes
 * and longitudes respectively. Therefore we only need two 
 * values for the latitudes and longitudes in order to compare
 * our in_point with them. The function finds out if a given 
 * point is inside a given polygone 
 * @function detect_point_in_polygon
 * @param {Array} in_point - contains one latitude and one longitude. 
 * @param {Array} in_polygon - edges of polygon are parallel to the 
 * latitudes and longitudes respectively.
 * @return {boolean} - returns true if the point is inside the polygon or 
 * on the border of the polygon and false if the point is not inside the polygon
 */
function detect_point_in_polygon(in_point, in_polygon) {
    var x = in_point[0] // longitude of the point
    var y = in_point[1] // latitude of the point

    var inside = false //initial boolean value for the check
    // iterate over the polygon 
    for (var i=0, j=in_polygon.length - 1; i<in_polygon.length; j=i++) {
        var xi = in_polygon[i][0] //longitude of vertex i
        var yi = in_polygon[i][1] //latitude of vertex i
        var xj = in_polygon[j][0] //longitude of vertex j
        var yj = in_polygon[j][1] //latitude of vertex j
        
        // check if the in_point is between the both lat and the both lon values
        // contain saves the boolean result
        var contain = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi) 
        // in_point is inside, if contain = true
        if (contain) { 
            inside = true 
        } 
    }
    // return the boolean result
    return inside; 
}


/**
 * The function fills an array with boolean values calculatet with 
 * the function detectPointInPolygon.
 * For each point of the in_route, we save the information if it
 * is in- or outsine the in_polygone in the separationArray.
 * The separationArray is declaired in the following.
 * @function make_separation_array
 * @param {Array} in_route - array of points
 * @param {Array} in_polygon - given polygone
 * @returns {Array} 
 */
function make_separation_array(in_route, in_polygone) {
    // console.log("test in_route.length" + in_route.length)
    var separation_array = [in_route.length]
    for(let i=0; i<in_route.length-1; i++) {
        separation_array[i] = detect_point_in_polygon(in_route[i], in_polygone)
    }
    // array that says for every point if it is inside the polygone
    return separation_array
}


/**
 * The purpose is to get the number of all sections and 
 * create an array with a corresponding number of storage space.
 * @function sectionCount
 * @param {Array} in_separation_array
 * @returns {Array} out_sectionArray
 */
function section_count(in_separation_array) {
    // Starting with 1 and not 0, because we actually only count
    // the intersections/changes of section
    var section_counter = 1
    for(let i=0; i<in_separation_array.length-2; i++) {
        if (in_separation_array[i] != in_separation_array[i+1]) {
            section_counter++
        }
    }
    var out_section_array = []
    // new array is created and as big as there are sections
    // plus 1 to sum every entry up in the final array spot
    for(let j = 0; j<section_counter; j++){       
        out_section_array.push(0)
    }
    // returning array has as much storage space
    // as sections of the route exists
    return out_section_array
}


/**
 * returns an array that contains distance, start- and 
 * endcoordinates of all sections of given route.
 * A JSON-Object is used here to create this complex array.
 * @function section_size_count
 * @param {Array} in_section_array
 * @param {Array} in_route
 * @param {Array} in_separation_array
 * @returns {Array} 
 */
function section_size_count(in_section_array, in_route, in_separation_array) {
    // declair arrays that will contain start- and endcoordinates of all sections
    var row1_start_array = [route[0]] // start of route = start of first section
    var row2_end_array = [] // first element filled in first iteration ...

    // later the following array will contain the both above and the
    // in_section_array which saves the distances of all sections
    var points_and_distances_array = []

    // the following variable section_size_counter gets increased
    // only if the current section ends. 
    var section_size_counter = 0
    for(let i=0; i<in_separation_array.length-2; i++) {
        if (in_separation_array[i] != in_separation_array[i+1]) {
            section_size_counter ++

            // end_coordinate of the current section gets saved and
            // start_coordinate of the next section          
            row2_end_array.push(route[i]) // end of next section
            row1_start_array.push(route[i+1]) // beginning of current section
        }
        else {
            // the distance of every section is a sum
            // of corresponding partial distances.
            in_section_array[section_size_counter]+=calculate_distance_between_2_points(in_route[i], in_route[i+1])
        }
     }

     // end of route = end of last section
     row2_end_array.push(in_route[in_route.length-1])

     // create JSON-Object - later it is needed to sort all array
     // without loosing the relation
     for(let i=0; i<row1_start_array.length; i++) {
        var json_temp = {
            "startPoint" : row1_start_array[i],
            "endPoint" : row2_end_array[i],
            "distance" : in_section_array[i]
        }
        points_and_distances_array.push(json_temp)
     }
       
     // return tableArray
     return points_and_distances_array
}


/**
 * 
 * @param {Array} object_array 
 * @param {Array} separation_array 
 */
function add_boolean_values(object_array, separation_array) {
    var boolean_array = [separation_array[0]]
    var JSONtemp =[]
    for(let i=1; i<object_array.length; i++) {
        boolean_array[i] = !boolean_array[i-1]

    }

    for(var i=0;i<object_array.length;i++){
        var temptest={
            "startPoint" : object_array[i].startPoint,
            "endPoint" : object_array[i].endPoint,
            "distance" : object_array[i].distance,
            "is_in_polygone" : boolean_array[i]
        }
        JSONtemp.push(temptest)
    }
    return JSONtemp
}


/**
 * bubbleSort is needed to sort the array. The shortest distance gets on top etc.
 * @function bubbleSort
 * @param {Array} in_jsonArray - the Array with the distances 
 * @returns {Array}
 * Algorithm like this:
 * https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
 */
function bubble_sort(in_jsonArray) {
    for (let i = 0; i < in_jsonArray.length; i++) {
        for (let j = 0; j < in_jsonArray.length-1; j++) {
            if (in_jsonArray[j].distance > in_jsonArray[j+1].distance) {
                let tmp = in_jsonArray[j]
                in_jsonArray[j] = in_jsonArray[j + 1]
                in_jsonArray[j + 1] = tmp
            }
        }
    }
    return in_jsonArray
}


/**
 * 
 * @param {JSON-Obj} result 
 */
function update_table(result) {
    var table = document.getElementById("table1")

    //generate table  
    for (var i= 0; i<result.length;i++){
        var row = table.insertRow()
        
        row.insertCell().innerHTML=result[i].distance
        row.insertCell().innerHTML=result[i].startPoint
        row.insertCell().innerHTML=result[i].endPoint
        row.insertCell().innerHTML=result[i].is_in_polygone
    }   
}


/**
 * returns the total length of given route
 * @param {} in_section_array 
 * @returns sum
 */
 function summation(in_section_array) {
    // sum is for saveing the sum of all elements in the in_section_array 
    var sum = 0 
    // itterate through in_section_array  and add every entry to sum
    for(let j = 0; j<in_section_array.length-1; j++){ 
           sum += in_section_array[j]
    }
    return sum
}


// Uebung_2

/**
 * function grants only a single LineString or the first LineString in a FeatureCollections
 * @param {GeoJSON-Obj} in_geojson 
 * @return array
 */
var input_route
function check_json_input(in_geojson) {
    console.log("check_json_input START")
    if (in_geojson.type == "FeatureCollection") {
        for (let i=0; i<in_geojson.features.length-1; i++) {
            if (in_geojson.features[i].geometry.type == "LineString") {
                input_route = in_geojson.features[i].geometry.coordinates
                console.log("check_json_input result: true")
                return input_route
            }
        }
    } else {
        // if single LineSting is given
        if (in_geojson.type == "LineString") {
            // console.log(in_geojson.type)
            console.log("check_json_input result: true")
            input_route = in_geojson.coordinates
            // console.log(input_route)
            return input_route
        } else {
            console.log("check_json_input result: false")
            return false
        } 
    }
}
