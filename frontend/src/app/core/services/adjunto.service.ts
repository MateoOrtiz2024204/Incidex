import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';


@Injectable({ providedIn: 'root' })
export class AdjuntoService {
  constructor(private http: HttpClient) {}

  subir(idIncidencia: number, idUsuario: number, archivo: File): Observable<{ ruta_archivo: string }> {
    const formData = new FormData();
    formData.append('id_incidencia', String(idIncidencia));
    formData.append('id_usuario', String(idUsuario));
    formData.append('archivo', archivo);

    return this.http
      .post<RespuestaApi<{ ruta_archivo: string }>>(`${environment.apiUrl}/adjuntos`, formData)
      .pipe(map((r) => r.data));
  }
}
