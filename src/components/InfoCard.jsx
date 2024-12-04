import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom'; // Para obtener la ruta actual
import '../css/infocard.css';

const InfoCard = ({ name = "Russel Martinez", id = "2021-1742", image = "../img/myImage.jpeg", by = "Created BY"}) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation(); // Usamos useLocation para obtener la ruta actual

  return (
    <div className="user-card-container">

      <div className="user-actions">
        {user ? (
          <>
          {location.pathname === "/create-post" && (
            <button className="logout-button" onClick={() => window.location.href = "/posts"}>
              Ver Publicaciones
            </button>
          )}
          {location.pathname === "/posts" && (
            <button className="logout-button" onClick={() => window.location.href = "/create-post"}>
              Crear Publicación
            </button>
          )}
          <button className="logout-button" onClick={logout}>Cerrar Sesión</button>
        </>
        ) : (
          <>
            <div
              className="redirect-card"
              onClick={() => window.location.href = "/login"}
            >
              <h3>Inicia Sesión</h3>
            </div>
            <div
              className="redirect-card"
              onClick={() => window.location.href = "/register"}
            >
              <h3>Registrarse</h3>
              <p>¿Nuevo? Regístrate aquí</p>
            </div>
          </>
        )}
      </div>

      <div className="user-card">
        <img className="user-card-image" src={image} alt={name} />
        <div className="user-card-details">
          <h3>{name}</h3>
          <p>{id}</p>
          <p>{by}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
