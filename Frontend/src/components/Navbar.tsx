import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Gestor de Sectores</h1>
        <div className="flex gap-6">
          <Link
            to="/sectores/crear"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Crear Sector
          </Link>
          <Link
            to="/sectores"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Ver Sectores
          </Link>
          <Link
            to="/validar"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Validar Ubicación
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
