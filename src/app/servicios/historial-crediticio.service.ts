import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialCrediticio } from '../interfaces/historial-crediticio';

@Injectable({
  providedIn: 'root',
})
export class HistorialCrediticioService {
  private apiUrl = 'http://localhost:8080/api/historiales';

  constructor(private http: HttpClient) {}

  listarHistoriales(): Observable<HistorialCrediticio[]> {
    return this.http.get<HistorialCrediticio[]>(this.apiUrl);
  }

  obtenerHistorialPorId(id: number): Observable<HistorialCrediticio> {
    return this.http.get<HistorialCrediticio>(`${this.apiUrl}/${id}`);
  }

  crearHistorial(
    historial: HistorialCrediticio
  ): Observable<HistorialCrediticio> {
    return this.http.post<HistorialCrediticio>(this.apiUrl, historial);
  }

  eliminarHistorial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
