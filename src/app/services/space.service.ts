import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Space } from '../models/space.model';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  private apiUrl = 'http://localhost:3000/spaces';

  constructor(private http: HttpClient) {}

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(this.apiUrl);
  }

  getSpaceById(id: number): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/${id}`);
  }

  addSpace(space: Space): Observable<Space> {
    return this.http.post<Space>(this.apiUrl, space);
  }

  updateSpace(space: Space): Observable<Space> {
    return this.http.put<Space>(`${this.apiUrl}/${space.id}`, space);
  }

  deleteSpace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
