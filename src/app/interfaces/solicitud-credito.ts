export interface SolicitudCredito {
  id?: number;
  usuarioId: number;
  montoSolicitado: number;
  fechaSolicitud: string; // Fecha en formato ISO o similar
  estado: string;
  puntajeCrediticio: number;
}
