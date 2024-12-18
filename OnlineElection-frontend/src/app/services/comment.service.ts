import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiBaseUrl}/api/comments`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addComment(
    candidateId: string,
    content: string
  ): Observable<{ message: string; comment: Comment }> {
    const body = { candidateId, content };
    return this.http.post<{ message: string; comment: Comment }>(
      this.apiUrl,
      body,
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }

  getComment(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/comment/${commentId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getComments(candidateId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${candidateId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
