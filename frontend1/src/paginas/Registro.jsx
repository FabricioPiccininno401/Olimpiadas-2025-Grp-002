import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Registro.css";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Debe completar email y contraseña");
      return;
    }

    login(loginData);
    alert("Login exitoso");
    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!registerData.nombre || !registerData.apellido || !registerData.dni) {
      alert("Debe completar todos los campos");
      return;
    }

    alert(`Usuario registrado: ${registerData.email}`);
    setRegisterData({
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setIsRegistering(false);
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        <div className="form-transition fade-in">
          {!isRegistering ? (
            <>
              <h2 className="registro-title">Iniciar Sesión</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="registro-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="registro-input"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="registro-input"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="registro-button">
                  Iniciar Sesión
                </button>
              </form>
              <p style={{ textAlign: "center", marginTop: "1rem", color: "#003D72", fontWeight: "600" }}>
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007BFF",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "700",
                  }}
                >
                  Regístrate aquí
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="registro-title">Crear Cuenta</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="registro-label">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="registro-input"
                    value={registerData.nombre}
                    onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">Apellido</label>
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="registro-input"
                    value={registerData.apellido}
                    onChange={(e) => setRegisterData({ ...registerData, apellido: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">DNI</label>
                  <input
                    type="text"
                    placeholder="DNI"
                    className="registro-input"
                    value={registerData.dni}
                    onChange={(e) => setRegisterData({ ...registerData, dni: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="registro-input"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="registro-input"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="registro-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="registro-input"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="registro-button">
                  Registrarse
                </button>
              </form>
              <p style={{ textAlign: "center", marginTop: "1rem", color: "#003D72", fontWeight: "600" }}>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007BFF",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "700",
                  }}
                >
                  Iniciar sesión aquí
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
