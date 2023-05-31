import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { ICurrencies } from 'src/app/shared/interfaces/currencies';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import {
  loadCurrencies,
  loadCurrenciesFail,
  loadCurrenciesSuccess,
} from 'src/app/state/currency/currency.actions';

@Injectable()
export class CurrencyEffects {
  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService,
  ) {}
  LoadCurrencies$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCurrencies),
      switchMap(() =>
        this.currencyService.getCurrencies().pipe(
          map((currencies: ICurrencies) =>
            loadCurrenciesSuccess({ currencies: currencies }),
          ),
          catchError((err: string) => of(loadCurrenciesFail({ error: err }))),
        ),
      ),
    );
  });
}
