/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 0.8.0 - finished
 */

/**
 * default route
 */
function main() {
    calculations(route)
}

function calculations(in_route) {  
     var separation_array = make_separation_array(in_route, polygon)
     // console.log(separation_array)
     
     var section_array = section_count(separation_array)
     // console.log("sectionArray")
     // console.log(section_array)
     
     var dist_array = section_size_count(section_array, in_route, separation_array)
     // console.log("distArray")
     // console.log(dist_array)

     var result = add_boolean_values(dist_array, separation_array)
     // console.log("result")
     // console.log(result);
 
     var sorted_array = bubble_sort(result)
     // console.log("sortedArray")
     // console.log(sorted_array)

     var total_sum = summation(sorted_array)

     var temp = update_tables(sorted_array, total_sum)
}


function get_input() {
    try {
        var in_lineString = document.getElementById("textField").value 
        console.log(in_lineString)

        var is_parseable = JSON.parse(in_lineString)
        console.log(is_parseable)

        // this I could put in beginning of calculations()
        var new_route = check_json_input(is_parseable)

        var new_table_values = calculations(new_route)
        
        new_table_values

    } catch (error) {
        window.alert("Please insert only GeoJSON object")
    }
}