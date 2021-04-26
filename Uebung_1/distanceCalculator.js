/**
 * @author @OTI2020 Gustav
 */

/**
 * this calculations base on a sphere as representation of the earth
 * so we have errors up to 0.3%, because the earth is a little elliptic
 * @function calculateDistanceBetweenTwoPoints
 * @param {Array} pointA - two points as arrays
 * @param {Array} pointB
 * each point-coordinates represent one latitude and one longitude
 * @return {float} - returns the distance between pointA and PointB
 * Algorithim like this https://www.movable-type.co.uk/scripts/latlong.html
 */
function calculateDistanceBetweenTwoPoints(pointA, pointB) {
    const p = Math.PI/180 // PI/180 is ca. 0.017453292519943295
    const R = 6371e3; // R is earth’s radius (mean radius = 6,371km)
    var c = Math.cos //cosisnus
    var s = Math.sin //sinus
    var at = Math.atan2 //
    
    var lat1 = pointA[1] //latitude of pointA
    var lon1 = pointA[0] //longitude of pointA
    var lat2 = pointB[1] //latitude of pointB
    var lon2 = pointB[0] //longitude of pointB
    
    // multiplication with p to convert from degree to radian
    // for the use in trigonomic functions
    const phi1 = lat1 * p
    const phi2 = lat2 * p
    const delPhi = (lat2-lat1) * p // delta phi - means difference between both latitudes
    const delLam = (lon2-lon1) * p // delta lambda - means difference between both longitudes
    
    const partA = s(delPhi/2) * s(delPhi/2) + c(phi1) * c(phi2) * s(delLam/2) * s(delLam/2)
    const partB = 2 * at(Math.sqrt(partA), Math.sqrt(1-partA))
    const dist = R * partB // in metres

    return dist
}


/**
* @function detectPointInPolygon
* @param {Array} point, {Array} polygon - needs a polygon as an array and the point as an array
* @return {boolean} - returns true if the point is inside the polygon or on the border of the polygon and 
*                     returns false if the point is not inside the polygon
*/
function detectPointInPolygon(point, polygon) {
    var x = point[0] //longitude of the point
    var y = point[1] //latitude of the point

    var inside = false //initial value for the check
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) { //iterate over the polygon 
        var xi = polygon[i][0] //longitude of vertex i
        var yi = polygon[i][1] //latitude of vertex i
        var xj = polygon[j][0] //longitude of vertex j
        var yj = polygon[j][1] //latitude of vertex j

        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi); //check if the casted ray intersect relevant segments of the polygon

        if (intersect) { //if the casted ray intersect a relevant segment the inside value is changend
            inside = !inside 
        } 
    }
    return inside; //return the result (true for odd number of relevat segments intersected and false for an even number of relevant segments intersected)
};










/** 
 * this array is needed to represent if a point
 * is in the given polygone or not
 */ 
let separationArray= [route.length]

/**
 * @function seperateOutsiedeCoordinates
 * @param {[double]} listOfCoordinates - is an array that contains Coordinates of a given route
 * @returns {double} sum - is the final sum of all subsequences
 */
function seperateOutsiedeCoordinates(listOfCoordinates, separationArray)
{
    for(let i=0; i<listOfCoordinates.length-1; i++){
        seperationArray[i] += (list[i], list[i+1])
    }
    return sum
}