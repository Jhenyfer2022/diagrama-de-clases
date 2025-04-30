const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const conection = require("../database/db");
const { promisify } = require("util");


/*exports.registerBoard = async (req, res) => {
  try {
    const name = req.body.name;
    const nivel = req.body.nivel;
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    let numeros = '0123456789'
    let letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let todo = numeros + letras
    let password = '';
    for (let x = 0; x < 15; x++) {
      let aleatorio = Math.floor(Math.random() * todo.length)
      password += todo.charAt(aleatorio)
    }
    conection.query(
      "INSERT INTO boards(name, passw, nivel, id_user) VALUES($1, $2, $3, $4)",
      [name, password, nivel, decodificada.id],
      async (error, result) => {
        if (error) {
          console.log(error);
        } else {
          conection.query(
            "SELECT id_board FROM boards",
            (error, results) => {
              if (error) {
                console.log(error);
                console.log("aqui")
              } else {
                for (let index = 0; index < results.rows.length; index++) {
                  gameRooms.push(results.rows[index].id_board)
                }
              }
            }
          )
          res.redirect('/personal')
        }

      }
    );
  } catch (error) {
    console.log(error);
  }
}*/
exports.registerBoard = async (req, res) => {
  try {
    const name = req.body.name;
    const nivel = req.body.nivel;
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    let numeros = '0123456789'
    let letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let todo = numeros + letras
    let password = '';
    for (let x = 0; x < 15; x++) {
      let aleatorio = Math.floor(Math.random() * todo.length)
      password += todo.charAt(aleatorio)
    }
    conection.query(
      "INSERT INTO boards(name, passw,  id_user) VALUES($1, $2, $3)",
      [name, password, decodificada.id],
      async (error, result) => {
        if (error) {
          console.log(error);
        } else {
          conection.query(
            "SELECT id_board FROM boards",
            (error, results) => {
              if (error) {
                console.log(error);
                console.log("aqui")
              } else {
                for (let index = 0; index < results.rows.length; index++) {
                  gameRooms.push(results.rows[index].id_board)
                }
              }
            }
          )
          res.redirect('/personal')
        }

      }
    );
  } catch (error) {
    console.log(error);
  }
}
// Controlador para obtener usuarios conectados a un tablero
// En tu controlador
exports.getUsersInBoard = async (req, res) => {
  try {
    const boardId = req.params.id; // ID del tablero desde la ruta

    const query = `
      SELECT users.name 
      FROM boardshares 
      JOIN users ON boardshares.id_user = users.Id 
      WHERE boardshares.id_board = $1
    `;

    // Ejecutar la consulta de forma asíncrona
    const result = await pool.query(query, [boardId]);

    // Renderiza la vista pasando la lista de usuarios y el id del tablero
    res.render('./public/p5/navbar.ejs', { users: result.rows, boardId });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor.');
  }
};



exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.body.boardId; // ID del board a eliminar
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );

    if (!boardId) {
      return res.status(400).send('ID de board requerido para eliminar.');
    }

    // Eliminar el board solo si pertenece al usuario actual
    conection.query(
      "DELETE FROM boards WHERE id_board = $1 AND id_user = $2",
      [boardId, decodificada.id],
      async (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error al eliminar el board');
        } else {
          console.log('Board eliminado exitosamente');
          res.redirect('/personal');
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor.');
  }
};

/*exports.registerBoard = async (req, res) => {
  try {
    const name = req.body.name;
    const nivel = req.body.nivel;
    const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
    let password = generarPasswordAleatoria();

    conection.query(
      "INSERT INTO boards(name, passw, nivel, id_user) VALUES($1, $2, $3, $4) RETURNING id_board",
      [name, password, nivel, decodificada.id],
      (error, result) => {
        if (error) {
          console.log(error);
          res.redirect('/personal'); // O redirige donde sea necesario
        } else {
          // Agregar la nueva sala a gameRooms sin reiniciar el servidor
          const newBoardId = result.rows[0].id_board;
          gameRooms.push(newBoardId); // Actualiza el array en memoria
          console.log('New board added:', newBoardId);
          res.redirect('/personal');
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};*/



exports.registerShare = async (req, res) => {
  try {
    const pass = req.body.pass;
    const decodificada = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRETO
    );
    conection.query(
      "SELECT id_board FROM boards WHERE passw = $1",
      [pass],
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          conection.query(
            "INSERT INTO boardshares(id_user, id_board) VALUES($1, $2)",
            [decodificada.id, result.rows[0].id_board],
            (error, result2) => {
              if (error) {
                console.log(error);
              }
              res.redirect('/compartidos')
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
