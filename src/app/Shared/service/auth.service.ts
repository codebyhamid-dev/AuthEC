import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../../Interfaces/AuthInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44303'; // Your API base URL
  constructor(private http: HttpClient) {}

  // auth.service.ts
  register(registerData: RegisterDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/api/auth/register`,
      registerData,
    );
  }
}
