import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { InstrumentsService } from "../services/instruments.service";
import { switchMap } from 'rxjs/operators';

export interface Symbol {
  instrumentId: string,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  instruments: any = [];
  symbols: { instrumentId: string, name: string }[] = [];
  showRealTimeAndChart: boolean = false;

  selectedSymbol: { instrumentId: string, name: string } | null = null;
  currentSymbol: { instrumentId: string, name: string } | null = null;

  readonly provider: string = 'oanda';

  constructor(private authService: AuthService, private instrumentsService: InstrumentsService) {}

  ngOnInit() {
    this.authService.authenticate().pipe(
      switchMap(() => this.instrumentsService.getInstruments(this.provider, 'forex'))
    ).subscribe({
      next: (response) => {
        this.instruments = response.data;
        this.symbols = response.data.map((el: any) => ({ instrumentId: el.id, name: el.symbol }));
      },
      error: (error) => console.error('Error fetching instruments:', error),
    });
  }

  showRealTimeComponent() {
    if (this.selectedSymbol) {
      this.currentSymbol = this.selectedSymbol;
      this.showRealTimeAndChart = true;
    }
  }

  onSymbolChange(symbol: { instrumentId: string, name: string }) {
    this.selectedSymbol = symbol;
  }
}

