import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';


@Injectable({ providedIn: 'root' })
export class ComentarioService {
  constructor(private http: HttpClient) {}

  crear(comentario: { id_incidencia: number; id_usuario: number; comentario: string }): Observable<void> {
    return this.http
      .post<RespuestaApi<null>>(`${environment.apiUrl}/comentarios`, comentario)
      .pipe(map(() => undefined));
  }
}
