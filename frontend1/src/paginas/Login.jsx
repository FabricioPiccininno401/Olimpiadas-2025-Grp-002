import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css"; 

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerUser, setRegisterUser] = useState({
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

  const handleLogin = async (e) => {
    console.log("Se activo el fetch desde el front")
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || "Error de login");

      login(data.token); // ✅ usa la función login() del contexto
      alert("Login exitoso");
      navigate("/carrito");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerUser.password !== registerUser.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    try {
      const res = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || "Error de registro");

      login(data.token); // ✅ usa la función login() del contexto
      alert("Registro exitoso");
      navigate("/carrito");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-transition fade-in">
          {!isRegistering ? (
            <>
              <h2 className="login-title">Iniciar Sesión</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="login-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="login-input"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="login-button" onClick={()=>{handleLogin}}>Iniciar Sesión</button>
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
              <h2 className="login-title">Crear Cuenta</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="login-label">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="login-input"
                    value={registerUser.nombre}
                    onChange={(e) => setRegisterUser({ ...registerUser, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">Apellido</label>
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="login-input"
                    value={registerUser.apellido}
                    onChange={(e) => setRegisterUser({ ...registerUser, apellido: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">DNI</label>
                  <input
                    type="text"
                    placeholder="DNI"
                    className="login-input"
                    value={registerUser.dni}
                    onChange={(e) => setRegisterUser({ ...registerUser, dni: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="login-input"
                    value={registerUser.email}
                    onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={registerUser.password}
                    onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="login-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="login-input"
                    value={registerUser.confirmPassword}
                    onChange={(e) => setRegisterUser({ ...registerUser, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="login-button" onClick={()=>{handleRegister}}>Registrarse</button>
              </form>

              <p style={{ textAlign: "center", marginTop: "1rem", color: "#FFF", fontWeight: "600" }}>
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
