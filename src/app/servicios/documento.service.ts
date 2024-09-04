import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../interfaces/documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private apiUrl = 'http://localhost:8080/api/documentos';

  constructor(private http: HttpClient) {}

  listarDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.apiUrl);
  }

  obtenerDocumentoPorId(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.apiUrl}/${id}`);
  }

  crearDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.apiUrl, documento);
  }

  eliminarDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
