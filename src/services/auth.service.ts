import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private realm = 'fintatech'
  private apiUrl = 'https://platform.fintacharts.com';
  private token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
  }

  getToken() {
    return this.token.asObservable();
  }

  getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  authenticate() {
    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: environment.client_id,
      username: environment.username,
      password: environment.password,
    });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<{
      access_token: string
    }>(`${this.apiUrl}/identity/realms/${this.realm}/protocol/openid-connect/token`,
      body.toString(),
      {headers}
    ).pipe(
      tap(response => {
        this.token.next(response.access_token);
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}
