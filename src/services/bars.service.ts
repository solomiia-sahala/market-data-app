import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarsService {
  private apiUrl = 'https://platform.fintacharts.com/api';

  constructor(private http: HttpClient) {
  }

  getHistoricalCountBack(instrumentId: string, provider: string): Observable<any> {
    const interval = '1';
    const periodicity = 'day';
    const barsCount = 500;
    const date = new Date().toISOString();

    const params = new HttpParams()
      .set('instrumentId', instrumentId)
      .set('provider', provider)
      .set('interval', interval)
      .set('periodicity', periodicity)
      .set('barsCount', barsCount.toString())
      .set('date', date);

    return this.http.get<any>(`${this.apiUrl}/bars/v1/bars/count-back`, {params});
  }

  getHistoricalDataRange(start: string, instrumentId: string, provider: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bars/v1/bars/date-range?instrumentId=${instrumentId}&provider=${provider}&interval=1&periodicity=minute&startDate=${start}`);
  }

  getTimeBack(instrumentId: string, provider: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-consolidators/bars/v1/bars/time-back?instrumentId=${instrumentId}&provider=${provider}&interval=1&periodicity=minute&timeBack=1.00:00:00`);
  }
}
