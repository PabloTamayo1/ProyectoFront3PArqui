export interface Usuario {
  id?: number;
  nombre: string;
  correoElectronico: string;
  numeroIdentificacion: string;
  ingresosMensuales: number;
  direccion?: string;
}
