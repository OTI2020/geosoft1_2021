var title = new Vue({
    el: '#headings',
    data: {
        message: 'Geosoftware 1, 2021 - Task 8'
    }
})

//Subtitle vue
var subtitle = new Vue({
    el: '#subtitle',
    data: {
        message: 'Tobias B., Dominik Z. und Gustav v.A.'
    }
})

//Table vue
var table = new Vue({
    el:'#table',
    data:{
        distances: distances
    },
})