import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser } from '../interfaces/github-user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly baseURL = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.baseURL}/users/${username}`)
  }
}
