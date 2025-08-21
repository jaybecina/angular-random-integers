import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, RandomNumber } from '../models/random.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  private apiUrl = '/api/v1/devtest/randominteger/';
  private headers = new HttpHeaders({
    Authorization: `Token ${environment.apiToken}`,
  });

  constructor(private http: HttpClient) {}

  getNumbers(limit = 10, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`, {
      headers: this.headers,
    });
  }

  generateNumber(): Observable<any> {
    return this.http.get(`${this.apiUrl}generate/`, { headers: this.headers });
  }

  testJsonPlaceholder(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
