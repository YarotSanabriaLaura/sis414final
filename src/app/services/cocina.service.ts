import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocina } from '../models/cocina';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {

private apiUrl = `${environment.apiBaseUrl}/cocinas`;





  constructor(private http: HttpClient) {}

  // READ: obtener todas las cocinas
  getAll(): Observable<Cocina[]> {
    return this.http.get<Cocina[]>(this.apiUrl);
  }

  // CREATE
  create(cocina: Omit<Cocina, 'id'> | Cocina): Observable<Cocina> {
    return this.http.post<Cocina>(this.apiUrl, cocina);
  }

  // UPDATE
  update(id: number, cocina: Cocina): Observable<Cocina> {
    return this.http.put<Cocina>(`${this.apiUrl}/${id}`, cocina);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

