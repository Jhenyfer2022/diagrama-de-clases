// migrate.js
const conection = require('./database/db');

const createTables = async () => {
    try {
        // Crear tabla de usuarios
        await conection.query(`
      CREATE TABLE IF NOT EXISTS users (
        Id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_connected BOOLEAN DEFAULT false
      );
    `);

        // Crear tabla de tableros
        await conection.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id_board SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        passw VARCHAR(100) NOT NULL,
     
        archivo JSON,
        id_user INTEGER NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(id_user) REFERENCES users(Id) ON DELETE CASCADE
      );
    `);

        // Crear tabla de comparticiones de tableros
        await conection.query(`
      CREATE TABLE IF NOT EXISTS boardshares (
        id SERIAL PRIMARY KEY,
        id_user INT NOT NULL,
        id_board INT NOT NULL,
        
        FOREIGN KEY (id_user) REFERENCES users(Id) ON DELETE CASCADE,
        FOREIGN KEY (id_board) REFERENCES boards(id_board) ON DELETE CASCADE
      );
    `);

        console.log('Tablas creadas exitosamente');
    } catch (error) {
        console.error('Error creando tablas:', error);
    } finally {
        await conection.end(); // Cierra la conexión al final
    }
};

createTables();
