import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Election } from '../models/election.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private apiUrl = `${environment.apiBaseUrl}/api/elections`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getElections(): Observable<Election[]> {
    return this.http.get<Election[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getElection(id: string): Observable<Election> {
    return this.http.get<Election>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  createElection(election: Election): Observable<Election> {
    return this.http.post<Election>(this.apiUrl, election, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  updateElection(id: string, election: Election): Observable<Election> {
    return this.http.put<Election>(`${this.apiUrl}/${id}`, election, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteElection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
