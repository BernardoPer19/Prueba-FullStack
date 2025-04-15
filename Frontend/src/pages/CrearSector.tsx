import { SectorForm } from "../components/SectorForm";
import { ToastContainer } from "react-toastify";

const CrearSector = () => {
  return (
    <main className="max-w-full mx-auto h-[80vh] flex items-center justify-center ">
      <ToastContainer />
      <SectorForm />
      {/* <VerSectores /> */}
    </main>
  );
};

export default CrearSector;