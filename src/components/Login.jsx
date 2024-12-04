import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
       navigate('/create-post');
    } catch (error) {
      alert('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Iniciar Sesión</h2>
        <input type="email" name="email" placeholder="Correo" required className="login-input" />
        <input type="password" name="password" placeholder="Contraseña" required className="login-input" />
        <button type="submit" className="login-button">Iniciar Sesión</button>
        <button type="button" className="back-button" onClick={() =>  navigate('/posts')}>
          Ir a inicio
        </button>
      </form>
    </div>
  );
};

export default Login;
