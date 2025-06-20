//Importaciones
const express = require("express"); //Servida de archivos estaticos
const cors = require("cors"); //Permite que el naveador interactue con el servidor origen (Este)
const jwt = require("jsonwebtoken"); //Tokens para tener sesion iniciada
const bcrypt = require("bcrypt"); //Encriptacion de contraseñas
const mysql = require("mysql2"); //Consultas y conexiones a BD
const app = express();
const nodemailer = require("nodemailer");//Para hacer envio de mails.
//Inicializaciones
app.use(cors());
app.use(express.json());

const SECRET = "ClaveToken"; //En ambientes profesionales cambiar esto a un archivo .env

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agencia"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});


// Funcion intermediaria (Middleware) para verificar validez del token, recomendable hacerlo en un archivo nuevo
function verificarToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ mensaje: "Token no provisto" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ mensaje: "Token inválido" });
    req.user = decoded;
    next();
  });
}

// Registro de usuarios
app.post("/api/registro", async (req, res) => {
  const { nombre, apellido, dni, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10); //Encriptacion

  const checkQuery = `SELECT * FROM usuarios WHERE Email = ?`;
  connection.query(checkQuery, [email], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: "Error en verificación" });

    if (rows.length > 0) {
      return res.status(400).json({ mensaje: "Usuario ya existe" });
    }
    const checkGerentes = `SELECT * FROM gerentes WHERE Email = ?`;
    connection.query(checkGerentes, [email], (err, rowsG) => {
      if (err) return res.status(500).json({ mensaje: "Error en verificación de gerentes" });

      if (rowsG.length > 0) {
        return res.status(400).json({ mensaje: "Usuario ya existe" });
    }


    const insertQuery = `INSERT INTO usuarios VALUES ('',?,?,?,?,?, NOW())`;
    connection.query(insertQuery, [nombre, apellido, dni, email, hashed], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ mensaje: "Error al registrar" });
      }
      

      const idUsuario = result.insertId;

      // Crear las tablas personalizadas
      const queries = [

        `CREATE TABLE carrito_${idUsuario} (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          id_User INT NOT NULL,
          id_Producto INT NOT NULL,
          cantidad INT NOT NULL,
          FOREIGN KEY (id_User) REFERENCES usuarios(id),
          FOREIGN KEY (id_Producto) REFERENCES servicios(id)
        )`,

        `CREATE TABLE pendiente_${idUsuario} (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          id_User INT NOT NULL,
          id_Producto INT NOT NULL,
          cantidad INT NOT NULL,
          FOREIGN KEY (id_User) REFERENCES usuarios(id),
          FOREIGN KEY (id_Producto) REFERENCES servicios(id)
        )`,

        `CREATE TABLE historial_${idUsuario} (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          id_User INT NOT NULL,
          id_Producto INT NOT NULL,
          cantidad INT NOT NULL,
          Fecha_Entregado DATE,
          FOREIGN KEY (id_User) REFERENCES usuarios(id),
          FOREIGN KEY (id_Producto) REFERENCES servicios(id)
        )`
      ];

      // Ejecutar las 3 consultas en serie
      let errores = [];

      queries.forEach((query, index) => {
        connection.query(query, (err) => {
          if (err) {
            console.error(`Error creando tabla #${index + 1}:`, err);
            errores.push(err.message);
          }
        });
      });

      if (errores.length > 0) {
        return res.status(500).json({ mensaje: "Usuario creado pero error al crear tablas", errores });
      }

      // Generar el token 
      const token = jwt.sign(
        {
          id: idUsuario,
          email,
          nombre,
          rol: "cliente"
        },
        SECRET,
        { expiresIn: "3h" }
      );

      res.json({ token });
    });
  });
});
});
// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Buscar en usuarios
  connection.query("SELECT * FROM usuarios WHERE Email = ?", [email], async (err, usuarios) => {
   
    if (err) return res.status(500).json({ mensaje: "Error en la base de datos" });

    if (usuarios.length > 0) {
      // Encontró en usuarios
      const usuario = usuarios[0];
      const valid = await bcrypt.compare(password, usuario.Contrasenia);
      if (!valid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

      const payload = {
        id: usuario.id,
        email: usuario.Email,
        nombre: usuario.Nombre,
        rol: "cliente"
      };

      const token = jwt.sign(payload, SECRET, { expiresIn: "3h" });
      return res.json({ token });
    }

    // Si no encontró en usuarios, buscar en gerentes
    connection.query("SELECT * FROM gerentes WHERE Email = ?", [email], async (err, gerentes) => {
      if (err) return res.status(500).json({ mensaje: "Error en la base de datos" });

      if (gerentes.length === 0) {
        return res.status(401).json({ mensaje: "Email no registrado" });
      }

      const gerente = gerentes[0];
      const valid = await bcrypt.compare(password, gerente.Contrasenia);
      if (!valid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

      const payload = {
        id: gerente.id,
        email: gerente.Email,
        nombre: gerente.Nombre,
        rol: "admin"
      };

      const token = jwt.sign(payload, SECRET, { expiresIn: "3h" });
      return res.json({ token });
    });
  });
});

// Ruta protegida de prueba
app.get("/api/protegido", verificarToken, (req, res) => {
  res.json({ mensaje: "Ruta protegida", user: req.user });
});


// Carga de los servicios en la Web
app.get("/api/servicios", (req, res) => {
  const sql = "SELECT id, nombre, precioOriginal, precio, ahorro, paquete, salida,combo, imagen, duracion, rating, estrellas, cantidad FROM servicios";


  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener servicios:", err);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
    res.json(results);
  });
});

//Carga de un producto de los serviios en el carrito
app.post("/api/carrito", verificarToken, (req, res) => {
  const id_User = req.user.id; // Viene del token JWT
  const { id_Producto } = req.body;
 
  if (!id_Producto) {
    return res.status(400).json({ error: "ID de producto requerido" });
  }

  const cantidad = 1; // Por defecto
 
  const sql = `INSERT INTO carrito_${id_User} (id_User, id_Producto, cantidad) VALUES (?, ?, ?)`;
  connection.query(sql, [id_User, id_Producto, cantidad], (err, result) => {
    if (err) {
      console.error("Error al agregar al carrito:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json({ ok: true, insertId: result.insertId });
  });
});


//Carga el carrito en la web, 
app.get('/api/carrito_lista', verificarToken, (req, res) => {
    
  const userId = req.user.id; // viene del token
  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  const query = `
    SELECT c.id, s.nombre, s.precioOriginal, s.precio, s.ahorro, s.paquete, s.salida, s.combo, s.imagen, s.duracion, s.rating, s.estrellas, s.cantidad
    FROM carrito_${userId} c
    JOIN servicios s ON c.id_Producto = s.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      console.log("Error: "+ err)
      return res.status(500).json({ error: 'Error al obtener el carrito' });
    }
    //console.log(results)
    res.json(results);
  });
});
//Elimina un producto del carrito
app.post("/api/eliminar",verificarToken, (req, res) => {
 
  const id_User=req.user.id;
  const { id_Producto } = req.body;
 
  if (!id_Producto) {
    return res.status(400).json({ error: "ID de producto requerido" });
  }


  const sql = `DELETE FROM carrito_${id_User} WHERE id = ?`;
  connection.query(sql, [id_Producto], (err, result) => {
    if (err) {

      console.error("Error eliminando del carrito:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json({ ok: true });
  });
});

//Envia todo a la tabla de pendientes y borra los registros de carrito
app.post("/api/comprar", verificarToken, (req, res) => {
  const id_User = req.user.id;
  const tablaCarrito = `carrito_${id_User}`;
  const tablaHistorial = `pendiente_${id_User}`;

  const sqlMover = `
    INSERT INTO ${tablaHistorial} (id_User, id_Producto, cantidad)
    SELECT id_User, id_Producto, cantidad FROM ${tablaCarrito};
  `;

  connection.query(sqlMover, (err, results1) => {
    if (err) {
      console.error("Error pasando a pendiente:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    const sqlBorrar = `DELETE FROM ${tablaCarrito};`;
    connection.query(sqlBorrar, (err, results2) => {
      if (err) {
        console.error("Error al borrar carrito:", err);
        return res.status(500).json({ mensaje: "Error al vaciar carrito" });
      }

      // ✅ Solo una vez se manda respuesta
      res.json({ ok: true });
    });
  });
});

//Carga el los pedidos pendientes en la web, 
app.get('/api/pendientes', verificarToken, (req, res) => {
  
  const userId = req.user.id; // viene del token
 
  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  const query = `
    SELECT c.id, s.nombre, s.precioOriginal, s.precio, s.ahorro, s.paquete, s.salida, s.combo, s.imagen, s.duracion, s.rating, s.estrellas, s.cantidad
    FROM pendiente_${userId} c
    JOIN servicios s ON c.id_Producto = s.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      console.log("Error: "+ err)
      return res.status(500).json({ error: 'Error al obtener los productos pendientes' });
    }
    
    res.json(results);
  });
});

//Ruta que devuelve el token
app.get("/api/usuario", verificarToken, (req, res) => {
  const { id, nombre, rol } = req.user; // suponiendo que lo guardás en req.user
  res.json({ id, nombre, rol });
});

//Cargar nuevo destino
app.post("/api/agregar_destino", verificarToken, (req, res) => {
  const user = req.user;

  if (user.rol !== "admin") {
    return res.status(403).json({ mensaje: "Solo administradores pueden agregar destinos" });
  }

  const { nombre, duracion, precioOriginal, precio, imagen, rating, estrellas } = req.body;

  const ahorro = precioOriginal - precio;
  const sql = `
    INSERT INTO servicios (nombre, duracion, precioOriginal, precio, ahorro, imagen, rating, estrellas, paquete, salida, combo, cantidad)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PAQUETE', 'Saliendo desde Buenos Aires', 'Hotel + Vuelo', 1)
  `;

  connection.query(sql, [nombre, duracion, precioOriginal, precio, ahorro, imagen, rating, estrellas], (err, result) => {
    if (err) {
      console.error("Error al insertar destino:", err);
      return res.status(500).json({ mensaje: "Error en base de datos" });
    }

    const nuevoDestino = {
      id: result.insertId,
      nombre,
      duracion,
      precioOriginal,
      precio,
      ahorro,
      imagen,
      rating,
      estrellas,
    };

    res.json({ ok: true, nuevoDestino });
  });
});
//Elimina pedido mediante ID
app.post("/api/EliminarPedido",verificarToken ,(req, res) => {
    const userId=req.user.id;
    const id_Pedido = req.body.id_Pedido;

  // si no sos admin, tomalo del token
  const tabla = `pendiente_${userId}`;

  const sql = `DELETE FROM ${tabla} WHERE id = ?`;
  console.log(sql)
  console.log(id_Pedido)
  connection.query(sql, [id_Pedido], (err, result) => {
    if (err) return res.json({ ok: false, error: err });
    return res.json({ ok: true });
  });
});
//Datos de ruta para el perfil
app.get("/api/perfil", verificarToken, (req, res) => {
   
  const { id, rol } = req.user; 
  
  if(rol=="cliente"){
    const sql="SELECT * FROM usuarios WHERE id = ?";
    connection.query(sql, [id], (err,result1)=>{
        if(err){
            console.error('Error en la consulta:', err);
            console.log("Error: "+ err)
            return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
        }

        
        
        res.json(result1)
    })
  }else if(rol=="admin"){
    const sql="SELECT * FROM gerentes WHERE id = ?";
    connection.query(sql, [id], (err,result2)=>{
        if(err){
            console.error('Error en la consulta:', err);
            console.log("Error: "+ err)
            return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
        }

        
        
        res.json(result2)
  })
}
});
//Ruta para mostrar pedidos pendientes de un ID
app.post("/api/buscar_pedidos", (req, res) => {
  const { id_usuario } = req.body;
  const sql = `SELECT c.id, c.id_User, s.nombre, s.salida, s.precio, s.paquete, s.imagen
FROM pendiente_${id_usuario} c
JOIN servicios s ON c.id_Producto = s.id;
`;

  connection.query(sql, (err, result) => {
    if (err) {
     
      res.status(500).json();
    } else {
    
      res.json(result);
    }
  });
});
//Elimina pedido de cliente mediante id
app.post("/api/eliminarPedidoAdmin", (req, res) => {

  const id_User=req.body.id_usuario;
  const id_Pedido=req.body.id_pendiente;

  if (!id_Pedido) {
    return res.status(400).json({ error: "ID de Pedido requerido" });
  }


  const sql = `DELETE FROM pendiente_${id_User} WHERE id = ?`;
  
  connection.query(sql, [id_Pedido], (err, result) => {
    if (err) {
      console.error("Error eliminando el pedido:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json({ ok: true });
  });
});
//Comfirma pedido y envia al historial
/*
app.post("/api/comfirmarEnvio", (req, res) => {

  const id_User=req.body.id_usuario;
  const id_Pedido=req.body.id_pendiente;

  if (!id_Pedido) {
    return res.status(400).json({ error: "ID de Pedido requerido" });
  }
  const insertSql = `
    INSERT INTO historial_${id_User} (id_User, id_Producto, cantidad, Fecha_Entregado)
    SELECT id_User, id_Producto, cantidad, NOW()
    FROM pendiente_${id_User}
    WHERE id = ?;
  `;

  const deleteSql = `
    DELETE FROM pendiente_${id_User}
    WHERE id = ?;
  `;

  connection.query(insertSql, [id_Pedido], (errInsert) => {
    if (errInsert) return res.status(500).json({ error: "Error al insertar en historial", errInsert });

    connection.query(deleteSql, [id_Pedido], (errDelete) => {
      if (errDelete) return res.status(500).json({ error: "Error al eliminar de pendientes", errDelete });

      res.json({ ok: true, mensaje: "Pedido confirmado y movido a historial" });
    });
  });

});
*/

app.post("/api/comfirmarEnvio", (req, res) => {
  const id_User = req.body.id_usuario;
  const id_Pedido = req.body.id_pendiente;
  console.log("llego al back")
  if (!id_Pedido) {
    return res.status(400).json({ error: "ID de Pedido requerido" });
  }

  // 1️⃣ PRIMERO: obtenemos el mail del usuario y el nombre del paquete
  const obtenerDatosSql = `
    SELECT u.email, s.nombre 
    FROM usuarios u 
    JOIN pendiente_${id_User} p ON u.id = p.id_User 
    JOIN servicios s ON p.id_Producto = s.id
    WHERE p.id = ?;
  `; 
  console.log(obtenerDatosSql)

  connection.query(obtenerDatosSql, [id_Pedido], (errDatos, resultados) => {
    if (errDatos || resultados.length === 0) {
     // console.log(errDatos)
      return res.status(500).json({ error: "Error al obtener datos del usuario/paquete", errDatos });
    }
    
    const { email, nombre } = resultados[0];
    console.log(resultados[0])
    const insertSql = `
      INSERT INTO historial_${id_User} (id_User, id_Producto, cantidad, Fecha_Entregado)
      SELECT id_User, id_Producto, cantidad, NOW()
      FROM pendiente_${id_User}
      WHERE id = ?;
    `;

    const deleteSql = `
      DELETE FROM pendiente_${id_User}
      WHERE id = ?;
    `;

    connection.query(insertSql, [id_Pedido], (errInsert) => {
      if (errInsert) {
        console.log("Error al insertar"+errInsert)
        return res.status(500).json({ error: "Error al insertar en historial", errInsert });
      }

      connection.query(deleteSql, [id_Pedido], (errDelete) => {
        if (errDelete) {
          console.log("error al deletear"+errDelete)
          return res.status(500).json({ error: "Error al eliminar de pendientes", errDelete });
        }
        
        // 2️⃣ CONFIGURAMOS EL ENVÍO DE MAIL CON NODEMAILER
        const transporter = nodemailer.createTransport({
          service: "gmail", // Podés usar Outlook, Yahoo, etc.
          auth: {
            user: "correo.pruebas.n8n.123@gmail.com",
            pass: "cidx nbmh tlju cita", // Usá una contraseña de app si usás Gmail
          },
        });
        console.log(email)
        const mensaje = {
          from: "AgenciaViajes <correo.pruebas.n8n.123@gmail.com>",
          to: email,
          subject: "Confirmación de envío de paquete",
          text: `Hola usuario, se te ha confirmado el envío del paquete: ${nombre}. \nSaludos atte: AgenciaViajes.`,
        };

        transporter.sendMail(mensaje, (error, info) => {
          if (error) {
            console.log("error al mensaje"+error)
            return res.status(500).json({ error: "Error al enviar el correo", error });
          }
          console.log("llegamos hasta aqui")
          res.json({ ok: true, mensaje: "Pedido confirmado, movido a historial y mail enviado." });
        });
      });
    });
  });
});



app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
