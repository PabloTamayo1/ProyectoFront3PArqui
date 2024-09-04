export interface TransaccionInterna {
  id: number;
  origen: string;
  destino: string;
  monto: number;
  fecha: Date;
  descripcion?: string;
}
