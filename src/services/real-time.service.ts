import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class RealTimeService {
  private WS_URL = 'wss://platform.fintacharts.com/api/streaming/ws/v1/realtime?token=';
  private socket$: WebSocketSubject<any> | null = null;

  constructor() {}

  connect(token: string) {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.WS_URL + token);
    }
  }

  sendSubscription(instrumentId: string) {
    if (this.socket$) {
      this.socket$.next({
        type: 'l1-subscription',
        id: '1',
        instrumentId: instrumentId,
        provider: 'simulation',
        subscribe: true,
        kinds: ['ask', 'bid', 'last'],
      });
    }
  }

  getRealTimeData(): Observable<any> {
    return this.socket$ as Subject<any>;
  }

  disconnect() {
    this.socket$?.complete();
  }
}
