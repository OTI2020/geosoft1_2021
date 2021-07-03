// we save dynamic data and can manupulate it later
let vOne = new Vue({
    el: '#vue-one-app', // like an id
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
        },
        print() {
            return this.names[0];
        }
    }
});


// an other instance
let vTwo = new Vue({
    el: '#vue-two-app',
    data: {
        helloStr: 'hello world - trust Jesus',
    },
    computed: {
        print() {
            return this.helloStr;
        }
    },
    methods: {
        changeData() {
            vOne.firstname = 'Archibaldino';
        }
    }
});

