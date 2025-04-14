import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CrearSector() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/sectores', data);
      alert('Sector creado exitosamente');
      reset();
    } catch (error) {
      alert('Error al crear sector');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2">
      <input placeholder="Nombre" {...register('nombre')} className="border p-2" />
      <input placeholder="Dirección" {...register('direccion')} className="border p-2" />
      <input placeholder="Latitud" {...register('lat')} className="border p-2" />
      <input placeholder="Longitud" {...register('lng')} className="border p-2" />
      <input placeholder="Horario inicio (HH:mm)" {...register('horario.inicio')} className="border p-2" />
      <input placeholder="Horario fin (HH:mm)" {...register('horario.fin')} className="border p-2" />
      <button className="bg-blue-500 text-white py-2">Crear sector</button>
    </form>
  );
}
