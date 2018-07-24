const express = require('express');


const app = express();



const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

var users = [];
avatars = [
    "https://goo.gl/Uw3R86",
    "https://goo.gl/14NTre",
    "https://goo.gl/PdeTre",
    "https://goo.gl/ya9614",
    "https://goo.gl/YsraoK",
    "https://goo.gl/GG3aLP",
];

io.on('connection', function(socket) {
    socket.on('sendLocation', function(data) {
    });
    socket.on('newUserConnected', (data)=>{
        users.push({id: socket.id, name: data.username, avatar: avatars[Math.floor(Math.random() * avatars.length)] });
        io.emit('newUserConnected', {userList: users});
    })
    socket.on('updateList', ()=>{
        socket.emit('updateUserList', {userList: users});
    })

    socket.on('sendUserNudge', (data)=>{
        io.emit('sendUserNudge', {id: data.id});
    })

    socket.on('disconnect', function(data) {
        for(i=0;i<users.length;i++){
            if(users[i].id === socket.id){
                users.splice(i,1);
            }
        }
        io.emit('newUserConnected', {userList: users});
    });
});
