import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogActividad } from '../interfaces/log-actividad';

@Injectable({
  providedIn: 'root',
})
export class LogActividadService {
  private apiUrl = 'http://localhost:8080/api/logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<LogActividad[]> {
    return this.http.get<LogActividad[]>(this.apiUrl);
  }

  createLog(log: LogActividad): Observable<LogActividad> {
    return this.http.post<LogActividad>(this.apiUrl, log);
  }
}
