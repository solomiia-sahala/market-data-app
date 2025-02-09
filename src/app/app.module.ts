import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HistoricalChartComponent } from "../components/historical-chart/historical-chart.component";
import { RealTimeComponent } from "../components/real-time/real-time.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from "../services/auth-interceptor.service";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HistoricalChartComponent,
    RealTimeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
