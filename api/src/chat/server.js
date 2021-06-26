const mongo = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

mongo.connect('mongodb://127.0.0.1/chat' , function(err , db){
    if (err)
        throw err;
    
    console.log('mongodb connect');

    io.on('connected' , function(){
        let chat = db.collection('chats');

        sendstatus = function(s){
            socket.emit('status' , s);
        }

        chat.find().limit(100).sort({_id1}).toArray(
            function(err , res){
                if (err)
                    throw err;

                socket.emit('output' , res);
            }
        );

        socket.on('input' , function(data){
            let name = data.name;
            let message = data.message;

            if (name==''  || message=='')
                sendstatus('please enter a valid message and a name');

            else{
                chat.insert({name:name , message:message} , function(){
                    io.emit('output' , [data]);

                    sendstatus({
                        message : 'message event',
                
                    });
                });
            }
        });
    });


});