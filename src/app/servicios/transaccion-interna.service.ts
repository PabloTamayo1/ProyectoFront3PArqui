import { Injectable } from '@angular/core';
import { TransaccionInterna } from '../interfaces/transaccion-interna';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransaccionInternaService {
  private apiUrl = 'http://localhost:8080/api/transacciones';

  constructor(private http: HttpClient) {}

  getTransacciones(): Observable<TransaccionInterna[]> {
    return this.http.get<TransaccionInterna[]>(this.apiUrl);
  }

  createTransaccion(
    transaccion: TransaccionInterna
  ): Observable<TransaccionInterna> {
    return this.http.post<TransaccionInterna>(this.apiUrl, transaccion);
  }
}
