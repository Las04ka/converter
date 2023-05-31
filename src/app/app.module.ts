import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from 'src/app/app.component';
import { CurrencyConverterComponent } from 'src/app/currency-converter/currency-converter.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { CurrencyEffects } from 'src/app/state/currency/currency.effects';
import { CurrencyReducer } from 'src/app/state/currency/currency.reducer';


@NgModule({
  declarations: [AppComponent, HeaderComponent, CurrencyConverterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ currency: CurrencyReducer }),
    EffectsModule.forRoot([CurrencyEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [CurrencyService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
