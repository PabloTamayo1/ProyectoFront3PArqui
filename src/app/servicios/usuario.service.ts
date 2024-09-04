import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private restApiUrl = 'http://localhost:8080/api/usuarios';
  private graphqlApiUrl = 'http://localhost:8080/graphql';

  constructor(private http: HttpClient) {}

  // Métodos REST
  getUsuariosREST(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.restApiUrl);
  }

  getUsuarioREST(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.restApiUrl}/${id}`);
  }

  createUsuarioREST(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.restApiUrl, usuario);
  }

  deleteUsuarioREST(id: number): Observable<void> {
    return this.http.delete<void>(`${this.restApiUrl}/${id}`);
  }

  // Métodos GraphQL
  getUsuariosGraphQL(): Observable<any> {
    const query = `
      query {
        listarUsuarios {
          id
          nombre
          correoElectronico
          numeroIdentificacion
          ingresosMensuales
          direccion
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query });
  }

  getUsuarioGraphQL(id: number): Observable<any> {
    const query = `
      query {
        obtenerUsuarioPorId(id: ${id}) {
          id
          nombre
          correoElectronico
          numeroIdentificacion
          ingresosMensuales
          direccion
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query });
  }

  createUsuarioGraphQL(usuario: Usuario): Observable<any> {
    const mutation = `
      mutation {
        crearUsuario(
          nombre: "${usuario.nombre}",
          correoElectronico: "${usuario.correoElectronico}",
          numeroIdentificacion: "${usuario.numeroIdentificacion}",
          ingresosMensuales: ${usuario.ingresosMensuales},
          direccion: "${usuario.direccion || ''}"
        ) {
          id
          nombre
          correoElectronico
          numeroIdentificacion
          ingresosMensuales
          direccion
        }
      }
    `;
    return this.http.post<any>(this.graphqlApiUrl, { query: mutation });
  }
}
