// we save dynamic data and can manupulate it later
console.log(this.atag);
new Vue({
    el: '#app',
    data: {
        firstname: '',
        lastname: '',
        names: ['Florian', 'Gustav', 'Peter'],
        persons: [
            {name: 'Florian', age: 21},
            {name: 'Gustav', age: 53},
        ]
    },
    computed: {
        fullname() {
            return `${this.firstname} ${this.lastname}`;
        }
    },
});


