import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estufa } from '../models/estufa';

@Injectable({
  providedIn: 'root'
})
export class EstufaService {

  private apiUrl = `${environment.apiBaseUrl}/estufas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Estufa[]> {
    return this.http.get<Estufa[]>(this.apiUrl);
  }

  create(estufa: any): Observable<Estufa> {
    return this.http.post<Estufa>(this.apiUrl, estufa);
  }

  update(id: number, estufa: any): Observable<Estufa> {
    return this.http.put<Estufa>(`${this.apiUrl}/${id}`, estufa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
