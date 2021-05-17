/**
 * just for better overview
 * @author @OTI2020 Gustav
 * @version 1.0.0 - unknown mistakes
 */

/**
 * default route
 */
function main() {
    var def_geojson_route = array_to_geojson(route)
    console.log(def_geojson_route)

    var new_route = check_json_input_and_select_array(def_geojson_route)

    calculations(new_route)
}

function calculations(in_route) {
    var def_geojson_polygon = array_to_geojson(polygon)
    console.log(def_geojson_polygon)

    var new_polygon = check_json_input_and_select_array(def_geojson_polygon)
    // console.log(new_polygon)
    // console.log(polygon)

    var separation_array = make_separation_array(in_route, new_polygon)
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
        // console.log(in_lineString)

        var is_parseable = JSON.parse(in_lineString)
        // console.log(is_parseable)

        var new_route = check_json_input_and_select_array(is_parseable)
        // console.log(new_route)

        var new_table_values = calculations(new_route)
        
        new_table_values

    } catch (error) {
        window.alert("Please insert only GeoJSON object")
    }
}