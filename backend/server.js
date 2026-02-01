require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Inicializar base de datos
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_admin INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla users creada o ya existe');
    await createDefaultAdmin();
  } catch (err) {
    console.error('❌ Error al crear tabla:', err);
  }
}

// Crear admin por defecto
async function createDefaultAdmin() {
  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  const adminEmail = 'admin@safemarket.com';

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [adminUsername]
    );

    if (result.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, 1)',
        [adminUsername, adminEmail, hashedPassword]
      );
      console.log('✅ Usuario admin creado: username=admin, password=admin123');
    }
  } catch (err) {
    console.error('❌ Error al verificar/crear admin:', err);
  }
}

// Inicializar al arrancar
initDatabase();

// ==================== RUTAS ====================

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

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: result.rows[0].id
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = result.rows[0];
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, is_admin, created_at FROM users ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// Ruta para eliminar usuario
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  if (id === '1') {
    return res.status(400).json({ message: 'No se puede eliminar el administrador principal' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

// Ruta para actualizar usuario
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, is_admin } = req.body;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5',
        [username, email, hashedPassword, is_admin ? 1 : 0, id]
      );
    } else {
      await pool.query(
        'UPDATE users SET username = $1, email = $2, is_admin = $3 WHERE id = $4',
        [username, email, is_admin ? 1 : 0, id]
      );
    }

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
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

    const result = await pool.query(
      'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, email, hashedPassword, is_admin ? 1 : 0]
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      userId: result.rows[0].id
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;