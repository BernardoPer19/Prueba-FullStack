import { SectorForm } from "../components/SectorForm";
import { ToastContainer } from "react-toastify";

const CrearSector = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <ToastContainer />
      <SectorForm />
      {/* <VerSectores /> */}
    </div>
  );
};

export default CrearSector;