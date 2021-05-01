/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 0.7.4 - capitulation
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