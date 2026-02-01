'use client';

import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: number;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_admin: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (id === 1) {
      alert('No se puede eliminar el administrador principal');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Error al eliminar usuario');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      is_admin: user.is_admin === 1
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const response = await fetch(`http://localhost:3001/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Usuario actualizado exitosamente');
        setEditingUser(null);
        setFormData({ username: '', email: '', password: '', is_admin: false });
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Error al actualizar usuario');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Usuario creado exitosamente');
        setShowCreateModal(false);
        setFormData({ username: '', email: '', password: '', is_admin: false });
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Error al crear usuario');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  const toggleAdmin = async (user: User) => {
    if (user.id === 1) {
      alert('No se puede cambiar el rol del administrador principal');
      return;
    }

    const newAdminStatus = user.is_admin === 0 ? 1 : 0;
    const action = newAdminStatus === 1 ? 'promover a administrador' : 'quitar permisos de administrador';

    if (!window.confirm(`¿Estás seguro de ${action} a ${user.username}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          is_admin: newAdminStatus === 1
        }),
      });

      if (response.ok) {
        alert(`Usuario ${newAdminStatus === 1 ? 'promovido a administrador' : 'degradado a usuario normal'} exitosamente`);
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Error al cambiar rol');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="admin-panel"><div className="loading">Cargando...</div></div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <button 
          className="btn-create-user"
          onClick={() => setShowCreateModal(true)}
        >
          ➕ Crear Usuario
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Total Usuarios</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{users.filter(u => u.is_admin === 1).length}</div>
          <div className="stat-label">Administradores</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{users.filter(u => u.is_admin === 0).length}</div>
          <div className="stat-label">Usuarios Normales</div>
        </div>
      </div>

      {/* Modal de Creación */}
      {showCreateModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Crear Nuevo Usuario</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_admin}
                    onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
                  />
                  <span>Crear como Administrador</span>
                </label>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-save">Crear Usuario</button>
                <button type="button" className="btn-cancel" onClick={() => {
                  setShowCreateModal(false);
                  setFormData({ username: '', email: '', password: '', is_admin: false });
                }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {editingUser && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña (dejar vacío para no cambiar)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Dejar vacío para mantener la actual"
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_admin}
                    onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
                    disabled={editingUser.id === 1}
                  />
                  <span>Es Administrador {editingUser.id === 1 ? '(No se puede cambiar)' : ''}</span>
                </label>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-save">Guardar</button>
                <button type="button" className="btn-cancel" onClick={() => {
                  setEditingUser(null);
                  setFormData({ username: '', email: '', password: '', is_admin: false });
                }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="users-table-container">
        <h2>Usuarios Registrados</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.is_admin === 1 ? 'admin' : 'user'}`}>
                    {user.is_admin === 1 ? '👑 Admin' : '👤 Usuario'}
                  </span>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-role-toggle"
                      onClick={() => toggleAdmin(user)}
                      title={user.is_admin === 1 ? 'Quitar Admin' : 'Hacer Admin'}
                      disabled={user.id === 1}
                    >
                      {user.is_admin === 1 ? '👤' : '👑'}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                      title="Eliminar"
                      disabled={user.id === 1}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;