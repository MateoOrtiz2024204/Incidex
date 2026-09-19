import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';
import { ActualizarUsuario, NuevoUsuario, Usuario } from '../../models/usuario.model';


@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<RespuestaApi<Usuario[]>>(`${environment.apiUrl}/usuarios`).pipe(map((r) => r.data));
  }

  crear(usuario: NuevoUsuario): Observable<void> {
    return this.http.post<RespuestaApi<null>>(`${environment.apiUrl}/usuarios`, usuario).pipe(map(() => undefined));
  }

  actualizar(id: number, cambios: ActualizarUsuario): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/usuarios/${id}`, cambios)
      .pipe(map(() => undefined));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<RespuestaApi<null>>(`${environment.apiUrl}/usuarios/${id}`).pipe(map(() => undefined));
  }
}
