function get_input() {
    try {
        var api_key = document.getElementById("input_field_api_key").value
        console.log(api_key)

    } catch (error) {
        window.alert("Please insert your correct API-key")
    }
}