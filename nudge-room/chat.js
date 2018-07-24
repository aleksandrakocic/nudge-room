const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket) => {
    console.log('someone connected'); 
    socket.username = 'anonymous';
    socket.on('change username', (name) => socket.username = name)
    socket.on('message',(msg) => io.emit('message', 
    {'username' : socket.username, 'message': msg }))
    socket.on('join', (username) => {
        if(username != null) {
            socket.username = username;
        }
        socket.broadcast.emit('message', 
         {user: 'server', 'message': socket.username + ' has join the chat' })
        //  var audio = new Audio('nudge.mp3');
        //  audio.play();
    })
})
// ~use socket.thumbnail for add random and the following function
// function guid(complexity = 4) {
//     function s4() {
//         return Math.floor((1 + Math.random()) * 0x10000)
//             .toString(16)
//             .substring(1);
//     }

//     var newGuid = '';

//     for (var i = 0; i < complexity; i++) {
//         newGuid += s4();
//         if (i !== complexity - 1) {
//           newGuid += '-';
//         }
//     }

//     return newGuid;
// }

// playSound (sound) {
//     if(sound) {
//     var audio = new Audio(sound);
//     audio.play();
//     }  
//  },



http.listen(3000, () => console.log('listening on port 3000'))
 