/**
 * @author @OTI2020 Gustav
 * @import route from route.js from datastore
 */
import route from route.js
var separationPreperationArray = [route.length]

var sum // this variable is needed to sum up values in the following function

/**
 * @function calculateNumberOfCoordinates - Calculates to distances between the 
 * individual coordinates and sums them up to one final sum
 * @param {[double]} listOfCoordinates - is an array that contains Coordinates of a given route
 * @returns {double} sum - is the final sum of all subsequences
 */


function calculateNumberOfCoordinates(listOfCoordinates)
{
    sum = 0
    for(var i=0; i<listOfCoordinates.length-1; i++){
        sum += (list[i], list[i+1])
    }
    return sum
}