import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RespuestaApi } from '../../models/api-response.model';
import { Categoria, Departamento, Prioridad, Ubicacion } from '../../models/catalogo.model';


@Injectable({ providedIn: 'root' })
export class CatalogoService {
  constructor(private http: HttpClient) {}

  listarDepartamentos(): Observable<Departamento[]> {
    return this.http
      .get<RespuestaApi<Departamento[]>>(`${environment.apiUrl}/departamentos`)
      .pipe(map((r) => r.data));
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<RespuestaApi<Categoria[]>>(`${environment.apiUrl}/categorias`).pipe(map((r) => r.data));
  }

  listarUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<RespuestaApi<Ubicacion[]>>(`${environment.apiUrl}/ubicaciones`).pipe(map((r) => r.data));
  }

  listarPrioridades(): Observable<Prioridad[]> {
    return this.http.get<RespuestaApi<Prioridad[]>>(`${environment.apiUrl}/prioridades`).pipe(map((r) => r.data));
  }

  // Departamentos
  crearDepartamento(datos: { nombre_departamento: string; descripcion: string | null }): Observable<void> {
    return this.http
      .post<RespuestaApi<null>>(`${environment.apiUrl}/departamentos`, datos)
      .pipe(map(() => undefined));
  }

  actualizarDepartamento(
    id: number,
    datos: { nombre_departamento: string; descripcion: string | null; estado_departamento: boolean }
  ): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/departamentos/${id}`, datos)
      .pipe(map(() => undefined));
  }

  // Categorias
  crearCategoria(datos: { id_departamento: number; nombre_categoria: string; descripcion: string | null }): Observable<void> {
    return this.http.post<RespuestaApi<null>>(`${environment.apiUrl}/categorias`, datos).pipe(map(() => undefined));
  }

  actualizarCategoria(
    id: number,
    datos: { id_departamento: number; nombre_categoria: string; descripcion: string | null; estado_categoria: boolean }
  ): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/categorias/${id}`, datos)
      .pipe(map(() => undefined));
  }

  // Ubicaciones
  crearUbicacion(datos: { nombre_ubicacion: string; nivel: string | null; descripcion: string | null }): Observable<void> {
    return this.http.post<RespuestaApi<null>>(`${environment.apiUrl}/ubicaciones`, datos).pipe(map(() => undefined));
  }

  actualizarUbicacion(
    id: number,
    datos: { nombre_ubicacion: string; nivel: string | null; descripcion: string | null; estado_ubicacion: boolean }
  ): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/ubicaciones/${id}`, datos)
      .pipe(map(() => undefined));
  }

  // Prioridades
  actualizarPrioridad(
    id: number,
    datos: { nombre_prioridad: string; descripcion: string | null; estado_prioridad: boolean }
  ): Observable<void> {
    return this.http
      .put<RespuestaApi<null>>(`${environment.apiUrl}/prioridades/${id}`, datos)
      .pipe(map(() => undefined));
  }
}
