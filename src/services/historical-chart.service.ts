import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarsService } from "./bars.service";

@Injectable({
  providedIn: 'root'
})
export class HistoricalChartService {
  constructor(private barService: BarsService) {
  }

  getHistoricalBars(
    instrumentId: string,
    provider: string,
  ): Observable<any> {
    return this.barService.getHistoricalCountBack(instrumentId, provider);
  }
}
