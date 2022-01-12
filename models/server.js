const express = require('express');

require('dotenv').config();
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Servidor{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();

        // Sockets

        this.sockets();

    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //directorio publico
        this.app.use(express.static('public'));


    }

    //rutas de mi app
    routes(){
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets(){

        this.io.on('connection', socketController );

    }

    listen(){
        this.server.listen( this.port, () =>{
            console.log(`App corriendo en http://localhost:${this.port}`);
        });
    }

}

module.exports = Servidor;