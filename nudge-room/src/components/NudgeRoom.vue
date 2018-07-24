<template>
  <div class="container">
    <h1>Nudge room</h1>
    
    <div class="container" v-if="!logedIn">
        <form action="" @submit.prevent="addUser" id="form">
            <div class="form-group">
                <label for="username">Enter your Username</label>
                <input type="text" class="form-control" id="username" placeholder="Type here" v-model="newUserName">
                <small id="usernamehelp" class="form-text text-muted">{{errorMsg}}</small>
            </div>
            <button type="submit" class="btn btn-outline-primary" >Submit</button>
        </form>
    </div>

    <div class="container" v-if="logedIn">
        <h2>List of all users</h2>
        <audio controls hidden id="nudge">
            <source src="./nudge.mp3" type="audio/mp3">
        </audio>
        <ul>
            <li v-for="user in users" v-bind:key="user.id" class="user">
               <img v-bind:src="user.avatar" @click="playNudge(user.id)">
                <p>{{user.name}}</p>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            logedIn: false,
            errorMsg: 'Please dont enter anything rude',
            newUserName: '',
            users: [],
            socket : io('localhost:3001')
        }
    },
    methods: {
        playNudge(id){
            console.log(id)
            this.socket.emit('sendUserNudge', { id: id });
        },
        addUser(){
            if(this.newUserName != ''){
                this.logedIn = true;
                this.socket.emit('newUserConnected', { username: this.newUserName });
                this.socket.emit('updateList');
                this.newUserName = '';
            } else {
                this.errorMsg = "Please eneter your user name";
            }
        }
    },
    mounted() {
        this.socket.on('newUserConnected', (userList)=>{
            this.users = userList.userList;
        })
        this.socket.on('sendUserNudge', (data)=>{
            if(data.id === this.socket.id) {
                var nudge = document.getElementById('nudge');
                nudge.play();
                console.log("only i got the nudge")
            }
        })
        
    },
    updated() {
      
        this.socket.on('updateList', (userList)=>{
        this.users = userList.userList;
        })
  },
}
</script>

<style>
body{
    height: 100vh;
    text-align: center;
}
.container {
  position: relative;
}
#form {
  margin-top: 70px;
}
ul {
    margin: 0 auto;
    padding: 0;
    max-width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
ul li {
    display: block;
}
ul li img {
    max-width: 50%;
}
input{
    margin: 0 auto;
    width: 45% !important; 
}
</style>