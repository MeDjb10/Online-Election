import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = `${environment.apiBaseUrl}/api/favorites`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavorites(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  addFavorite(candidateId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${candidateId}`,
      {},
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }

  removeFavorite(candidateId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${candidateId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
