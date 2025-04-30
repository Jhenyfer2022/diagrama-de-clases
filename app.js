const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const conection = require("./database/db")
const app = express()
var socket = require('socket.io');

//seteamos el motor de plantillas
app.set('view engine', 'ejs')

//seteamos en express la carpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde formularios
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//seteamos las variables de entorno
dotenv.config({ path: './env/.env' })

//para poder trabajar con las cookies
app.use(cookieParser())

//llamar al router
app.use('/', require('./routes/router.js'))

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('SERVER UP running in http://localhost:3000/login')
})

const io = socket(server)
global.gameRooms = [];





io.on('connection', (socket) => {
  console.log('new Client')
  socket.emit('welcome', 'Hello')
  socket.on('joinRoom', (room) => {
    //console.log(room);
    console.log("Verificando el Room: " + room)
    // console.log("Verificando el gameRooms: " + gameRooms[0])
    for (let i = 0; i < gameRooms.length; i++) {
      console.log("Verificando el gameRooms: " + gameRooms[i])
      if (gameRooms[i] == room) {
        console.log("Probado: " + gameRooms[i])
        //room = gameRooms[i];
        console.log("Probando" + room);
        socket.join(room)
        io.in(room).emit('newUser', 'New player has joined the room: ' + room)
        return socket.emit('success', 'you have succefully joined this room')
      } else {

        console.log("Entro por aqui")
      }
    }
    socket.disconnect()
  })



  socket.on('mouse', mouseMsg)
  function mouseMsg(vectorDeEntidades2, vectorDeLineas2, room) {
    const vectorDescargar = [vectorDeEntidades2, vectorDeLineas2]
    console.log(vectorDeEntidades2)
    console.log(vectorDeLineas2)
    var json = JSON.stringify(vectorDescargar)

    conection.query(
      "UPDATE boards SET archivo = $1 WHERE id_board = $2",
      [json, room],
      (error, result) => {
        if (error) {
          console.log(error);
        }
      }
    );
    socket.in(room).emit('mouse', vectorDeEntidades2, vectorDeLineas2, room)
  }



}
)
/*io.on('connection', (socket) => {
  console.log('New Client Connected');
  socket.emit('welcome', 'Hello');

  // Evento para unirse a una sala
  socket.on('joinRoom', (room) => {
    console.log('Joining Room:', room);
    if (gameRooms.includes(room)) {
      socket.join(room);
      io.in(room).emit('newUser', 'New player has joined the room: ' + room);
      socket.emit('success', 'You have successfully joined this room');
    } else {
      socket.disconnect();
    }
  });

  // Función para actualizar el archivo cuando se recibe un evento 'mouse'
  socket.on('mouse', (vectorDeEntidades2, vectorDeLineas2, room) => {
    const vectorDescargar = [vectorDeEntidades2, vectorDeLineas2];
    const json = JSON.stringify(vectorDescargar);

    // Actualiza el campo 'archivo' en la base de datos
    conection.query(
      "UPDATE boards SET archivo = $1 WHERE id_board = $2",
      [json, room],
      (error, result) => {
        if (error) {
          console.error('Error updating board:', error);
        } else {
          console.log('Board updated successfully with new data');
        }
      }
    );

    // Emite el evento 'mouse' a todos los clientes de la sala
    socket.in(room).emit('mouse', vectorDeEntidades2, vectorDeLineas2, room);
  });
});*/
//module.exports = gameRooms;