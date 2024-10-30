   // web socket connectio 
    socketConnection = async () => {
        socket.addEventListener('open', (event) => {
            // Connection is open
        });

        socket.addEventListener('message', (event) => {
            const message = event.data;
            // Handle the received message
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket error', event);
        });

        socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Connection closed cleanly, code=' + event.code + ', reason=' + event.reason);
            } else {
                console.error('Connection abruptly closed');
            }
        });
        //Handling Server-Side WebSocket
        const WebSocket = require('ws');
        const server = new WebSocket.Server({ port: 8080 });

        server.on('connection', (socket) => {
            console.log('Client connected');
            socket.on('message', (message) => {
                socket.send('You said: ' + message);
            });
            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });
        socket.close(1000, 'Connection closed by the client');
    }