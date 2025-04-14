export interface TiposSector {
  id: string;
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
  horario: {
    inicio: string; 
    fin: string;    
  };
}


export type NuevoTiposSector = Omit<TiposSector, "id">