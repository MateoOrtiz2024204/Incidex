import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';
import { Notificacion } from '../../models/notificacion.model';


@Injectable({ providedIn: 'root' })
export class NotificacionService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Notificacion[]> {
    return this.http
      .get<RespuestaApi<Notificacion[]>>(`${environment.apiUrl}/notificaciones`)
      .pipe(map((r) => r.data));
  }

  marcarLeida(id: number): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/notificaciones/${id}/leer`, {})
      .pipe(map(() => undefined));
  }

  marcarTodasLeidas(): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/notificaciones/leer-todas`, {})
      .pipe(map(() => undefined));
  }
}
