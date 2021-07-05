// we save dynamic data and can manupulate it later
let vOne = new Vue({
    el: '#app', // like an id
    data: {
        username: '',
        password: '',
        currentUser: 'Florian',
        feedback: '',
        users: [
            {name:'Florian', password:'1234'},
            {name:'Gustav', password:'gut'},
            {name:'gfreiher', password:'sehrgut'},
            {name:'halloTuer', password:'qwert'},
        ]
    },
    methods: {
        checkPassword(){
            console.log("halloTimo");
            console.log(this.users.filter(user => password === user.password));
            return this.users.filter(user => password === user.password)
        },
        checkCredentials(event){
            event.preventDefault()
            if (
                this.username === this.currentUser &&
                this.checkPassword(this.password).length !== 0
            ){
                this.feedback = 'correct credentials'
            } else {
                this.feedback = 'wrong credentials'
            }
        },
        changeUser(name){
            this.currentUser = name
        }
    }
});