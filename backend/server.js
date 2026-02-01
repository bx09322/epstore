const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Crear base de datos SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err);
  } else {
    console.log('Base de datos SQLite conectada');
    initDatabase();
  }
});

// Inicializar base de datos
function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      is_admin INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla:', err);
    } else {
      console.log('Tabla users creada o ya existe');
      createDefaultAdmin();
    }
  });
}

// Crear admin por defecto
function createDefaultAdmin() {
  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  const adminEmail = 'admin@safemarket.com';

  db.get('SELECT * FROM users WHERE username = ?', [adminUsername], async (err, row) => {
    if (err) {
      console.error('Error al verificar admin:', err);
    } else if (!row) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      db.run(
        'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, 1)',
        [adminUsername, adminEmail, hashedPassword],
        (err) => {
          if (err) {
            console.error('Error al crear admin:', err);
          } else {
            console.log('Usuario admin creado: username=admin, password=admin123');
          }
        }
      );
    }
  });
}

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ message: 'El usuario o email ya existe' });
          }
          return res.status(500).json({ message: 'Error al registrar usuario' });
        }

        res.status(201).json({
          message: 'Usuario registrado exitosamente',
          userId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.is_admin === 1
      }
    });
  });
});

// Ruta para obtener todos los usuarios (solo admin)
app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, email, is_admin, created_at FROM users', [], (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
    res.json(users);
  });
});

// Ruta para eliminar usuario (solo admin, no puede eliminarse a sí mismo)
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  // Verificar que no sea el usuario con ID 1 (admin principal)
  if (id === '1') {
    return res.status(400).json({ message: 'No se puede eliminar el administrador principal' });
  }

  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar usuario' });
    }

    if (this.changes === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});

// Ruta para actualizar usuario (solo admin)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, is_admin } = req.body;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        'UPDATE users SET username = ?, email = ?, password = ?, is_admin = ? WHERE id = ?',
        [username, email, hashedPassword, is_admin ? 1 : 0, id],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error al actualizar usuario' });
          }
          res.json({ message: 'Usuario actualizado exitosamente' });
        }
      );
    } else {
      db.run(
        'UPDATE users SET username = ?, email = ?, is_admin = ? WHERE id = ?',
        [username, email, is_admin ? 1 : 0, id],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error al actualizar usuario' });
          }
          res.json({ message: 'Usuario actualizado exitosamente' });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para crear nuevo usuario desde el panel admin
app.post('/api/users', async (req, res) => {
  const { username, email, password, is_admin } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, is_admin ? 1 : 0],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ message: 'El usuario o email ya existe' });
          }
          return res.status(500).json({ message: 'Error al crear usuario' });
        }

        res.status(201).json({
          message: 'Usuario creado exitosamente',
          userId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;