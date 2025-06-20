import { createContext, useContext, useState } from "react";

const PendientesContext = createContext();

export const usePendientes = () => useContext(PendientesContext);

export const PendientesProvider = ({ children }) => {
  const [pendientes, setPendientes] = useState([]);
  const [completados, setCompletados] = useState([]); 

  const agregarAPendientes = (compras) => {
    setPendientes((prev) => [...prev, ...compras]);
  };

  const confirmarPago = (index) => {
    setCompletados((prev) => [...prev, pendientes[index]]);
    setPendientes((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelarViaje = (index) => {
    setPendientes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PendientesContext.Provider
      value={{ pendientes, agregarAPendientes, confirmarPago, cancelarViaje, completados }}
    >
      {children}
    </PendientesContext.Provider>
  );
};
