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

  getAll(): Observable<Cocina[]> {
    return this.http.get<Cocina[]>(this.apiUrl);
  }

  create(cocina: Omit<Cocina, 'id'>): Observable<Cocina> {
    return this.http.post<Cocina>(this.apiUrl, cocina);
  }

  update(id: number, cocina: Cocina): Observable<Cocina> {
    return this.http.put<Cocina>(`${this.apiUrl}/${id}`, cocina);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
