import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';
import {
  ActualizarIncidencia,
  DetalleIncidencia,
  FiltrosIncidencia,
  Incidencia,
  IncidenciaCreada,
  NuevaIncidencia,
} from '../../models/incidencia.model';


@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  constructor(private http: HttpClient) {}

  listar(filtros?: FiltrosIncidencia): Observable<Incidencia[]> {
    let params = new HttpParams();

    if (filtros) {
      Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor) params = params.set(clave, valor);
      });
    }

    return this.http
      .get<RespuestaApi<Incidencia[]>>(`${environment.apiUrl}/incidencias`, { params })
      .pipe(map((r) => r.data));
  }

  obtenerPorId(id: number): Observable<DetalleIncidencia> {
    return this.http
      .get<RespuestaApi<DetalleIncidencia>>(`${environment.apiUrl}/incidencias/${id}`)
      .pipe(map((r) => r.data));
  }

  crear(incidencia: NuevaIncidencia): Observable<IncidenciaCreada> {
    return this.http
      .post<RespuestaApi<IncidenciaCreada>>(`${environment.apiUrl}/incidencias`, incidencia)
      .pipe(map((r) => r.data));
  }

  actualizar(id: number, cambios: ActualizarIncidencia): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/incidencias/${id}`, cambios)
      .pipe(map(() => undefined));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<RespuestaApi<null>>(`${environment.apiUrl}/incidencias/${id}`).pipe(map(() => undefined));
  }
}
