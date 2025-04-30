const express = require('express')
const router = express.Router()
var path = require('path');


const conection = require('../database/db')

const authController = require('../controllers/authController')
const boardController = require('../controllers/boardController');
const { Connection } = require('pg');

router.get('/', authController.isAuthenticated, (req, res) => {
    console.log(req.user);  // Verifica si `req.user` tiene un valor
    res.render('index', { user: req.user })
})

router.get('/login', (req, res) => {
    res.render('login', { alert: false })
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/registerBoard', (req, res) => {
    res.render('registerBoard')
})

router.get('/personal', authController.isAuthenticated, (req, res) => {
    conection.query('SELECT * FROM boards WHERE id_user = $1', [req.user.id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('table', { results: results.rows, user: req.user })
        }
    })
})

router.get('/compartidos', authController.isAuthenticated, (req, res) => {
    conection.query('SELECT * FROM boards INNER JOIN boardshares ON boardshares.id_board = boards.id_board AND boardshares.id_user = $1',
        [req.user.id], (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('tableShare', { results: results.rows, user: req.user })
            }
        })
})

router.get('/join', (req, res) => {
    res.render('join')
})

/*
router.get('/lienzo', (req,res)=>{
    res.sendFile(path.resolve('./public/p5/index.html'));
})*/

//Segunda manera de enviarlo en formato ejs

router.get('/lienzo/:id', authController.isAuthenticated, (req, res) => {
    const id_board = req.params.id

    conection.query('SELECT * FROM boards WHERE id_board = $1', [id_board], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render(path.resolve('./public/p5/index.ejs'), { user: req.user, board: results.rows[0] });
        }
    })
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
})
/*router.get('/lienzo/:id', authController.isAuthenticated, (req, res) => {
    const id_board = req.params.id
    conection.query('SELECT *,b.id_board,b.name,b.passw,b.archivo,b.id_user,u.email,u.name FROM boards as b, boardshares as bd,users as u WHERE bd.id_board=b.id_board and bd.id_user=u.Id and u.is_connected = true  and b.id_board = $1', [id_board], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render(path.resolve('./public/p5/index.ejs'), { user: req.user, board: results.rows });
        }
    })
})*/
router.get('/lienzoo/:id', (req, res) => {
    const id_board = req.params.id
    conection.query('SELECT * FROM boards WHERE id_board = $1', [id_board], (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log("UNO" + results.rows[0].archivo);
            res.json(results.rows[0].archivo);
        }
    })
})
router.get('/delete/:id', async (req, res) => {
    const id_board = req.params.id;
    try {
        conection.query('DELETE FROM boards WHERE id_board = $1', [id_board], (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log(`Tablero con id ${id_board} eliminado correctamente.`);
                res.redirect('/personal');  // Redirigir a la página principal o a donde prefieras
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el tablero.');
    }
});

/*router.get('/lienzoo/:id', (req, res) => {
    const id_board = req.params.id;
    conection.query('SELECT * FROM boards WHERE id_board = $1', [id_board], (error, results) => {
        if (error) {
            console.error('Error fetching board:', error);
            res.status(500).json({ error: 'Error fetching board' });
        } else {
            if (results.rows.length > 0) {
                const archivo = results.rows[0].archivo || JSON.stringify([[], []]); // Verifica que archivo no sea null
                console.log("UNO " + archivo);
                res.json(JSON.parse(archivo));  // Asegúrate de enviar un objeto JSON válido
            } else {
                res.status(404).json({ error: 'Board not found' });
            }
        }
    });
});*/

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/registerBoardd', boardController.registerBoard)
router.post('/Join', boardController.registerShare)
router.post('/delete', boardController.deleteBoard)

module.exports = router