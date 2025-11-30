import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estufa } from '../models/estufa';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstufaService {

  private apiUrl = `${environment.apiBaseUrl}/estufas`;



constructor(private http: HttpClient) {}

  // READ: obtener todas las estufas
  getAll(): Observable<Estufa[]> {
    return this.http.get<Estufa[]>(this.apiUrl);
  }

  // CREATE
  create(estufa: Omit<Estufa, 'id'> | Estufa): Observable<Estufa> {
    return this.http.post<Estufa>(this.apiUrl, estufa);
  }

  // UPDATE
  update(id: number, estufa: Estufa): Observable<Estufa> {
    return this.http.put<Estufa>(`${this.apiUrl}/${id}`, estufa);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
