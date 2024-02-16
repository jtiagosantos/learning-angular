import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HousingLocation } from '../interfaces/housing-location';
import { Observable } from 'rxjs';

interface InputSubmitApplication {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly baseURL = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(`${this.baseURL}/`);
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation | undefined>(`${this.baseURL}/${id}`);
  }

  getHousingLocationsByCity(city: string): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(`${this.baseURL}?city=${city}`)
  }

  submitApplication({ firstName, lastName, email }: InputSubmitApplication) {
    alert(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
