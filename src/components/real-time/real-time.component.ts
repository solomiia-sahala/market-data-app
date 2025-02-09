import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { RealTimeService } from "../../services/real-time.service";
import { AuthService } from "../../services/auth.service";
import { DatePipe } from "@angular/common";
import { Symbol } from "../../app/app.component";

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbol: Symbol | null = null;

  marketPrice: number | null = null;
  lastUpdated: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private realTimeService: RealTimeService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['symbol'] && !changes['symbol'].firstChange) {
      this.subscription.unsubscribe();
      this.connectWebSocket();
    }
  }

  private connectWebSocket() {
    if (!this.symbol?.instrumentId) return;

    this.authService.getToken().subscribe(token => {
      if (token) {
        this.realTimeService.connect(token);
        this.realTimeService.sendSubscription(this.symbol!.instrumentId);

        this.subscription = this.realTimeService.getRealTimeData().subscribe(data => {
          if (data.last) {
            this.marketPrice = data.last.price;
            this.lastUpdated = this.formatTimestamp(data.last.timestamp);
          }
        });
      }
    });
  }

  formatTimestamp(timestamp: string | undefined): string {
    return timestamp ? this.datePipe.transform(timestamp, 'yyyy-MM-dd HH:mm:ss') ?? '' : 'Waiting...';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.realTimeService.disconnect();
  }
}


