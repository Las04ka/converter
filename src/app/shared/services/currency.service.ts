import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICurrencies } from 'src/app/shared/interfaces/currencies';

const apiUrl = 'https://api.currencyapi.com/v3/latest';
const apiKey = 'cEvX7BCwmmaawg3001rkjydJmISykSOfBUyX6GlD';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<ICurrencies> {
    const options = {
      params: new HttpParams()
        .set('currencies', 'USD,UAH,EUR')
        .set('apikey', apiKey),
    };
    return this.http.get<ICurrencies>(apiUrl, options);
  }
}
