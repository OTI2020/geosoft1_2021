// we save dynamic data and can manupulate it later
console.log(this.atag);
new Vue({
    el: '#app',
    data: {
        myValue: 42,
    },
    methods: {
        subtract: function() {
            this.myValue--
        },
        add: function() {
            this.myValue++;
        },
    },
});


