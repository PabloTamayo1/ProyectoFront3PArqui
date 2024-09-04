import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudCredito } from '../interfaces/solicitud-credito';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SolicitudCreditoService {
  private restApiUrl = 'http://localhost:8080/api/solicitudes';
  private graphqlApiUrl = 'http://localhost:8080/graphql';

  constructor(private http: HttpClient) {}

  // Métodos REST
  getSolicitudesREST(): Observable<SolicitudCredito[]> {
    return this.http.get<SolicitudCredito[]>(this.restApiUrl);
  }

  getSolicitudREST(id: number): Observable<SolicitudCredito> {
    return this.http.get<SolicitudCredito>(`${this.restApiUrl}/${id}`);
  }

  createSolicitudREST(
    solicitud: SolicitudCredito
  ): Observable<SolicitudCredito> {
    return this.http.post<SolicitudCredito>(this.restApiUrl, solicitud);
  }

  deleteSolicitudREST(id: number): Observable<void> {
    return this.http.delete<void>(`${this.restApiUrl}/${id}`);
  }

  // Métodos GraphQL
  getSolicitudesGraphQL(): Observable<any> {
    const query = `
      query {
        listarSolicitudes {
          id
          usuarioId
          montoSolicitado
          fechaSolicitud
          estado
          puntajeCrediticio
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query });
  }

  getSolicitudGraphQL(id: number): Observable<any> {
    const query = `
      query {
        obtenerSolicitudPorId(id: ${id}) {
          id
          usuarioId
          montoSolicitado
          fechaSolicitud
          estado
          puntajeCrediticio
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query });
  }

  createSolicitudGraphQL(solicitud: SolicitudCredito): Observable<any> {
    const mutation = `
      mutation {
        crearSolicitud(
          usuarioId: ${solicitud.usuarioId},
          montoSolicitado: ${solicitud.montoSolicitado},
          fechaSolicitud: "${solicitud.fechaSolicitud}",
          estado: "${solicitud.estado}",
          puntajeCrediticio: ${solicitud.puntajeCrediticio}
        ) {
          id
          usuarioId
          montoSolicitado
          fechaSolicitud
          estado
          puntajeCrediticio
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query: mutation });
  }
}
