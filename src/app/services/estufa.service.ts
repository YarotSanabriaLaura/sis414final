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

  getAll(): Observable<Estufa[]> {
    return this.http.get<Estufa[]>(this.apiUrl);
  }

  create(estufa: Estufa): Observable<Estufa> {
    return this.http.post<Estufa>(this.apiUrl, estufa);
  }

  update(id: number, estufa: Estufa): Observable<Estufa> {
    return this.http.put<Estufa>(`${this.apiUrl}/${id}`, estufa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

