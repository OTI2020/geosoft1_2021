# geosoft1_2021
Practice for the first Geosoftware course at the Institute for Geoinformatics at the University of Münster in the summer semester 2021.
## functions
### detectPointInPolygone()
* Algorithim is much more easyer than this https://www.algorithms-and-technologies.com/point_in_polygon/javascript
* because the edges of the given polygone are parallel to longitudes or latitudes

### calculateDistanceBetweenToPoints()
* Algorithim like this https://www.movable-type.co.uk/scripts/latlong.html

### changeLatLon() 
* only for testing if lat and lon are swapped - function swapps lat and lon

### makeSeparationArray()
* returns Array that contains for every point of route.js the information, if it is in- or outside the given polygon

### sectionCount()
* The purpose is to get the number of all sections and create an array with a corresponding number of storage space.

### sectionSizeCount()
* Function prepares moredimensional array for the use in the html-file
* fill colums with:
 - distance
 - startcoordinate
 - endcoordinate
 - boolean value that says if point is in- or outside polygon

### function bubbleSort(in_distanceArray) {
* bubbleSort is needed to sort the array. The shortest distance gets on top etc.
* Algorithm like this https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
