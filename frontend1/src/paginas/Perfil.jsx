import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Perfil.css";
import logoutIcon from "../assets/cerrar-sesion.png";

export default function Perfil() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario]=useState({})
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  //Trae la inormacion del perfil del usuario mediante id del token
  const token=localStorage.getItem('token');
  useEffect(() => {
    console.log("Perfil desde front")
    fetch(`http://localhost:3001/api/perfil`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => 
      setUsuario(data[0]))
      .catch((error) => console.error("Error al obtener datos de perfil:", error));
  }, []);
  
  
  



  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <h2 className="perfil-title">Perfil del Usuario</h2>

        <div className="perfil-dato">
          <span className="perfil-label">Nombre:</span>
          <span>{usuario.Nombre}</span>
        </div>

        <div className="perfil-dato">
          <span className="perfil-label">Apellido:</span>
          <span>{usuario.Apellido}</span>
        </div>

        <div className="perfil-dato">
          <span className="perfil-label">DNI:</span>
          <span>{usuario.DNI}</span>
        </div>

        <div className="perfil-dato">
          <span className="perfil-label">Correo:</span>
          <span>{usuario.Email}</span>
        </div>

        <div className="perfil-dato">
          <span className="perfil-label">Contraseña:</span>
          <span>********</span>
        </div>

        <div className="boton-logout-container">
          <button onClick={handleLogout} className="btn-cerrar-sesion">
            Cerrar sesión
            <img src={logoutIcon} alt="Cerrar sesión" className="icono-logout" />
          </button>
        </div>
      </div>
    </div>
  );
}