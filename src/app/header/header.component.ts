import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';

import { ICurrencies, ICurrency } from 'src/app/shared/interfaces/currencies';
import { loadCurrencies } from 'src/app/state/currency/currency.actions';
import {
  selectCurrencies,
  selectCurrenciesLoading,
} from 'src/app/state/currency/currency.reducer';
import { AppState } from 'src/app/state/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hryvna?: ICurrency;
  $currencies? = this.store.select(selectCurrencies).pipe(
    tap((el) => (this.hryvna = el.data['UAH'])),
    map((currencies) => {
      const clonedCurrencies = JSON.parse(JSON.stringify(currencies));
      delete clonedCurrencies.data['UAH'];
      return clonedCurrencies as ICurrencies;
    }),
  );
  $isLoading = this.store.select(selectCurrenciesLoading);
  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadCurrencies());
  }
}
