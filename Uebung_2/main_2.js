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
     console.log("sectionArray")
     console.log(sectionArray)
     // console.log("sectionArray " + sectionArray)
     
     var distArray = sectionSizeCount(sectionArray, route, separationArray)
     console.log("distArray")
     console.log(distArray)
     // console.log("distArray " + distArray)

     var result = add_boolean_values(distArray, separationArray)
     console.log("result")
     console.log(result);
 
     var sortedArray = bubbleSort(result)
     console.log("sortedArray")
     console.log(sortedArray)

     var temp = update_table(sortedArray)
     // console.log("sortedArray " + sortedArray)
 }