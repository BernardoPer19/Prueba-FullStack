import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/crear">Crear Sector</Link>
        <Link to="/sectores">Ver Sectores</Link>
        <Link to="/validar">Validar Ubicación</Link>
      </nav>
      <Routes>
        <Route path="/crear" element={<CrearSector />} />
        <Route path="/sectores" element={<VerSectores />} />
        <Route path="/validar" element={<ValidarUbicacion />} />
      </Routes>
    </Router>
  );
}

export default App;
