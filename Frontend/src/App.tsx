import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearSector from "./pages/CrearSector";
import VerSectores from "./pages/VerSectores";
import ValidarUbicacion from "./pages/ValidarUbicacion";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sectores/crear" element={<CrearSector />} />
        <Route path="/sectores" element={<VerSectores />} />
        <Route path="/validar" element={<ValidarUbicacion />} />
      </Routes>
    </Router>
  );
}

export default App;
