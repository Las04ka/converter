import { createAction, props } from '@ngrx/store';

import { ICurrencies } from 'src/app/shared/interfaces/currencies';

export const loadCurrencies = createAction('[Currency] Load Currency');
export const loadCurrenciesSuccess = createAction(
  '[Currency] Load Currency Success',
  props<{ currencies: ICurrencies }>(),
);
export const loadCurrenciesFail = createAction(
  '[Currency] Load Currency Fail',
  props<{ error: string }>(),
);
