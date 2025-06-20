import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsuario({
          id: payload.id,
          email: payload.email,
          nombre: payload.nombre,
          rol: payload.rol
        });
      } catch (e) {
        console.error("Token inválido", e);
        localStorage.removeItem("token");
        setUsuario(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsuario({
      id: payload.id,
      email: payload.email,
      nombre: payload.nombre
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
