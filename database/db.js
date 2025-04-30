const { Client } = require('pg')
/*const connection = new Client({
  user: 'postgres',        // Usuario de tu PostgreSQL local
  password: 'admin123',        // Contraseña que configuraste
  host: 'localhost',       // Servidor local
  port: 5432,             // Puerto por defecto de PostgreSQL
  database: 'diagramador', // Nombre de tu BD local
});

// Conectar y exportar
connection.connect()
  .then(() => {
    console.log('✅ Conexión exitosa a PostgreSQL local');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a PostgreSQL local:', error);
  });
*/
module.exports = connection;

//const mysql = require('mysql')

const client = new Client("postgresql://diagramclases_user:s36TodZh504VudSM0lhYTDu5Qz5iQfWm@dpg-crs8rtggph6c738r0o9g-a.oregon-postgres.render.com/diagramclases")*/

const conection = new Client({
  connectionString: "postgresql://diagrama_de_clase_user:xZrMb59nr0S7INchuPXgHMDtR4iV30ZJ@dpg-cu5g402j1k6c73esk3bg-a.oregon-postgres.render.com/diagrama_de_clase",
  ssl: {
    rejectUnauthorized: false
  }
});
conection.connect().then(() => {
  console.log('Conexión exitosa a la base de datos PostgreSQL en localhost');
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});
module.exports = conection
/*
const 
 = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'diagramador'
})
 
conection.connect((error)=>{
  if(error){
      console.log('El error de conexion es: '+error)
      return
  }
  console.log('Conectado a la BD MYSQL')
})*/

