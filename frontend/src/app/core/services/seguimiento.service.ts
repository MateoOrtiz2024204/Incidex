import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';
import { Asignacion } from '../../models/seguimiento.model';


@Injectable({ providedIn: 'root' })
export class SeguimientoService {
  constructor(private http: HttpClient) {}

  listarAsignaciones(): Observable<Asignacion[]> {
    return this.http.get<RespuestaApi<Asignacion[]>>(`${environment.apiUrl}/asignaciones`).pipe(map((r) => r.data));
  }

  crearAsignacion(datos: { id_incidencia: number; id_usuario: number; observaciones?: string }): Observable<void> {
    return this.http
      .post<RespuestaApi<null>>(`${environment.apiUrl}/asignaciones`, datos)
      .pipe(map(() => undefined));
  }
}
