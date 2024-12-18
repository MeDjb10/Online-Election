import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private apiUrl = `${environment.apiBaseUrl}/api/results`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getElectionResults(electionId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${electionId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
