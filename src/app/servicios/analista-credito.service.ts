import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalistaCredito } from '../interfaces/analista-credito';

@Injectable({
  providedIn: 'root',
})
export class AnalistaCreditoService {
  private apiUrl = 'http://localhost:8080/api/analistas';

  constructor(private http: HttpClient) {}

  listarAnalistas(): Observable<AnalistaCredito[]> {
    return this.http.get<AnalistaCredito[]>(this.apiUrl);
  }

  obtenerAnalistaPorId(id: number): Observable<AnalistaCredito> {
    return this.http.get<AnalistaCredito>(`${this.apiUrl}/${id}`);
  }

  crearAnalista(analista: AnalistaCredito): Observable<AnalistaCredito> {
    return this.http.post<AnalistaCredito>(this.apiUrl, analista);
  }

  eliminarAnalista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
