/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 0.8.0 - finished
 * @function main
 */
 main() //runner for main
 function main() {    
     var separation_array = make_separation_array(route, polygon)
     //console.log(separation_array)
     
     var section_array = section_count(separation_array)
     // console.log("sectionArray")
     // console.log(section_array)
     
     var dist_array = section_size_count(section_array, route, separation_array)
     // console.log("distArray")
     // console.log(dist_array)

     var result = add_boolean_values(dist_array, separation_array)
     // console.log("result")
     // console.log(result);
 
     var sorted_array = bubble_sort(result)
     // console.log("sortedArray")
     // console.log(sorted_array)

     var temp = update_table(sorted_array)
 }