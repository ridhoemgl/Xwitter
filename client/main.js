const app = new Vue({
    el: '#app',
    data() {
        return {
            errors : [],
            success : null,
            isLogin : false,
            users : [],
            useremail: '',
            password: '',
            tweets : [],
            _id : '',
            name : '',
            username : '',
            email : '',
            follows : 0,
            followers : 0,
            userTweet : 0,
            recomendationFollows : []
        }
    },
    mounted() {
        this.getAllTweets(),
        this.checkLogin()
    },
    methods: {
        signin() {
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/signin',
                data : {
                    email: this.useremail,
                    password: this.password
                }
            })
            .then(response => {
                localStorage.setItem("token", response.data);
                this.isLogin = true
                this.getUserProfile()
            })
            .catch(err => {
                this.errors = []
                let ERRORS = JSON.parse(JSON.stringify(err.response))
                if(err.response.status == 404){
                    this.errors.push(ERRORS.data.msg)
                }else{
                    this.errors.push('internal server error')
                }
            })
        },
        signout(){
            localStorage.removeItem("token");
            this.isLogin = false
        },
        checkLogin() {
            let isToken = localStorage.getItem("token")
            if(isToken){
                this.isLogin = true
            }
        },
        getAllTweets(){
            axios({
                method : 'GET',
                url : 'http://localhost:3000/tweets',
            })
            .then(response => {
                this.tweets = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        getUserProfile(){
            let token = localStorage.getItem("token")
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users',
                headers : {
                    token
                }
            })
            .then(response => {
                this.name = response.data.name
                this._id = response.data._id
                this.username = response.data.username
                this.email = response.data.email
                this.follows = response.data.follows
                this.followers = response.data.followers
                this.getUserTweet()
            })
            .catch(err => {
                console.log(err);
            })
        },
        getUserTweet(){
            axios({
                method : 'GET',
                url : `http://localhost:3000/tweets/${this._id}`,
            })
            .then(response => {
                this.userTweet = response.data.length
                this.getUserToFollow()
            })
            .catch(err => {
                console.log(err)
            })
        },
        getUserToFollow(){
            axios({
                method : 'GET',
                url : `http://localhost:3000/users/${this._id}`,
            })
            .then(response => {
                this.recomendationFollows = response.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})