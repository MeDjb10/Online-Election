import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private apiUrl = `${environment.apiBaseUrl}/api/votes`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  castVote(candidateId: string): Observable<{ message: string; vote: Vote }> {
    const body = { candidateId };
    return this.http.post<{ message: string; vote: Vote }>(this.apiUrl, body, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getUserVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/user`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getVotesByCandidate(candidateId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/candidate/${candidateId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
