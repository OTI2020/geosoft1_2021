// we save dynamic data and can manupulate it later
console.log(this.atag);
new Vue({
    el: '#app',
    data: {
        person: {
            name: 'Gustav',
            height: 181,
            follows: 'Jesus Christ'
        },
        website: 'http://google.com/',
        atag: '<a href="http://google.com/"> testing the google </a>'
    },
    methods: {
        credo: function(who) {
            return 'I, ' + this.person.name + ', belive in ' + who +'!';
        },
    },
});


