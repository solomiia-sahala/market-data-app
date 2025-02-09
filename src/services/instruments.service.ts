import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstrumentsService {
  private apiUrl = 'https://platform.fintacharts.com/api';

  constructor(private http: HttpClient) {
  }

  getInstruments(provider: string, kind: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments/v1/instruments?provider=${provider}&kind=${kind}`
    );
  }

  getProviders(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/instruments/v1/providers`
    );
  }

  getExchanges(): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments/v1/exchanges`);
  }
}
