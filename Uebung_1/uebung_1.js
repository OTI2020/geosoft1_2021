/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 0.7.0 - prepare table for html
 * @function main
 */
main() //runner for main
function main() {    
    var separationArray = makeSeparationArray(route, polygon)
    console.log(separationArray)
    // console.log("separationArray " + separationArray)
    
    var sectionArray = sectionCount(separationArray)
    console.log(sectionArray)
    // console.log("sectionArray " + sectionArray)
    
    var distArray = sectionSizeCount(sectionArray, route, separationArray)
    console.log(distArray)
    // console.log("distArray " + distArray)

    var sortedArray = bubbleSort(distArray)
    console.log(sortedArray)
    // console.log("sortedArray " + sortedArray)
}


/**
 * only for testing if lat and lon are swapped
 * function swapps lat and lon
 * @function changeLatLon
 * @param {Array} point
 * @returns {Array}
 */
function changeLatLon(point) {
    var temp = point[0]
    point[0] = point[1]
    point[1] = temp

    return point
}


/**
 * this calculations base on a sphere as representation
 * of the earth so we have errors up to 0.3%, because 
 * the earth is a little elliptic. 
 * Each point-coordinates represent one latitude and one 
 * longitude.
 * @function calculateDistanceBetweenTwoPoints
 * @param {Array} in_pointA - two points as arrays
 * @param {Array} in_pointB
 * @return {float} - returns the distance between pointA 
 * and PointB
 * Algorithim like this: 
 * https://www.movable-type.co.uk/scripts/latlong.html
 */
 function calculateDistanceBetweenTwoPoints(in_pointA, in_pointB) {
    const p = Math.PI/180 // PI/180 is ca. 0.017453292519943295
    const R = 6371e3; // R is earth’s radius (mean radius = 6,371 km)
    var c = Math.cos // cosisnus
    var s = Math.sin // sinus
    var at = Math.atan2 // arctan2
    
    // test
    // console.log("pointA " + in_pointA)
    // console.log("pointB " + in_pointB)

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
// test function calculateDistanceBetweenTwoPoints
// console.log("test calculateDistanceBetweenTwoPoints")
// console.log(calculateDistanceBetweenTwoPoints(polygon[0], polygon[1]))


/**
 * The edges of the given polygon are parallel to the latitudes
 * and longitudes respectively. Therefore we only need two 
 * values for the latitudes and longitudes in order to compare
 * our in_point with them. The function finds out if a given 
 * point is inside a given polygone 
 * @function detectPointInPolygon
 * @param {Array} in_point - contains one latitude and one longitude. 
 * @param {Array} in_polygon - edges of polygon are parallel to the 
 * latitudes and longitudes respectively.
 * @return {boolean} - returns true if the point is inside the polygon or 
 * on the border of the polygon and false if the point is not inside the polygon
 */
function detectPointInPolygon(in_point, in_polygon) {
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
// test function detectPointInPolygon
// console.log("test detectPointInPolygon")
// console.log(detectPointInPolygon(route[0], polygon))


/**
 * The function fills an array with boolean values calculatet with 
 * the function detectPointInPolygon.
 * For each point of the in_route, we save the information if it
 * is in- or outsine the in_polygone in the separationArray.
 * The separationArray is declaired in the following.
 * @function makeSeparationArray
 * @param {Array} in_route - array of points
 * @param {Array} in_polygon - given polygone
 * @returns {Array} 
 */
function makeSeparationArray(in_route, in_polygone) {
    // console.log("test in_route.length" + in_route.length)
    var separationArray = [in_route.length]
    for(let i=0; i<in_route.length-1; i++) {
        separationArray[i] = detectPointInPolygon(in_route[i], in_polygone)
    }
    // array that says for every point if it is inside the polygone
    return separationArray
}
// test function sectionSizeCount
// console.log("test makeSeparationArray")
// console.log(makeSeparationArray(route, polygon))


/**
 * The purpose is to get the number of all sections and 
 * create an array with a corresponding number of storage space.
 * @function sectionCount
 * @param {Array} in_separationArray
 * @returns {Array} out_sectionArray
 */
function sectionCount(in_separationArray) {
    // Starting with 1 and not 0, because we actually only count
    // the intersections/changes of section
    var sectionCounter = 1
    for(let i=0; i<in_separationArray.length-2; i++) {
        if (in_separationArray[i] != in_separationArray[i+1]) {
            sectionCounter++
        }
    }
    var out_sectionArray = [0]
    // new array is created and as big as there are sections
    // plus 1 to sum every entry up in the final array spot
    for(let j = 0; j<sectionCounter; j++){       
        out_sectionArray.push(0)
    }
    // returning array has as much storage space
    // as sections of the route exists
    return out_sectionArray
}
// test function sectionCount
// console.log("test sectionCounter")
// console.log(sectionCount(makeSeparationArray(route, polygon)))


/**
 * @function sectionSizeCount
 * @param {Array} in_sectionArray
 * @param {Array} in_route
 * @param {Array} in_separationArray
 * @returns {Array} 
 */
function sectionSizeCount(in_sectionArray, in_route, in_separationArray) {
    var rowOneArray = [route[0]]
    var rowTwoArray = []

    var sectionSizeCounter = 0
    for(let i=0; i<in_separationArray.length-2; i++) {
        if (in_separationArray[i] != in_separationArray[i+1]) {
            sectionSizeCounter ++

            rowOneArray.push(route[i]) // end of current section
            rowTwoArray.push(route[i+1]) // beginning of next section
        }
        else {
            in_sectionArray[sectionSizeCounter]+=calculateDistanceBetweenTwoPoints(in_route[i], in_route[i+1])
        }
     }
     rowTwoArray.push(route[route.length-1])

     console.log("tabellenvorbereitung")
     console.log(rowOneArray)
     console.log(rowTwoArray)

     var tableArray = [[],[],[],[]]
     tableArray[0].push(in_sectionArray)
     tableArray[1].push(rowOneArray)
     tableArray[2].push(rowTwoArray)
     tableArray[3].push()

     // sum is for saveing the sum of all elements in the in_sectionArray
     var sum = 0 
     // itterate through in_sectionArray and add every entry to sum
     for(let j = 0; j<in_sectionArray.length-1; j++){ 
            sum += in_sectionArray[j]
     }
     // last storage place in in_sectionArrayrepresents sum
     // in_sectionArray[sectionSizeCounter+1] =  sum 

     return tableArray
}
// test function sectionSizeCount
// console.log("test sectionSizeCounter")
// console.log(sectionSizeCount(sectionCount(makeSeparationArray(route, polygon))))





/**
 * bubbleSort is needed to sort the array. The shortest distance gets on top etc.
 * @function bubbleSort
 * @param {Array} in_distanceArray - the Array with the distances 
 * @returns {Array}
 * Algorithm like this:
 * https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
 */
function bubbleSort(in_distanceArray) {
    for (let i = 0; i < in_distanceArray.length; i++) {
        for (let j = 0; j < in_distanceArray.length; j++) {
            if (in_distanceArray[j] > in_distanceArray[j + 1]) {
                let tmp = in_distanceArray[j]
                in_distanceArray[j] = in_distanceArray[j + 1]
                in_distanceArray[j + 1] = tmp
            }
        }
    }
    return in_distanceArray
}
/**
 * This function creates an array that contians, what the
 * html-page should show using a table. Route sections 
 * should be presented together with their length and 
 * coordinates, sorted by length.
 */


/**
 * in addition, the total length of these route sections 
 * should be indicated on the page.
 */