import { createReducer, createSelector, on } from '@ngrx/store';

import { ICurrencies } from 'src/app/shared/interfaces/currencies';
import {
  loadCurrencies,
  loadCurrenciesFail,
  loadCurrenciesSuccess,
} from 'src/app/state/currency/currency.actions';
import { AppState } from 'src/app/state/state';

export interface CurrencyState {
  loading: boolean;
  currencies: ICurrencies;
  error?: string
}

const initialState: CurrencyState = {
  loading: false,
  currencies: {
    meta:{
      last_updated_at:''
    },
    data:{
    }
  },
  error: '',
};

export const CurrencyReducer = createReducer(
  initialState,
  on(loadCurrencies, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadCurrenciesSuccess, (state, { currencies }) => ({
    ...state,
    currencies: currencies,
    loading: false,
  })),
  on(loadCurrenciesFail, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
);

const CurrencyState = (state: AppState) => state.currency;
export const selectCurrencies = createSelector(
  CurrencyState,
  (state) => state.currencies,
);
export const selectCurrenciesLoading = createSelector(
  CurrencyState,
  (state) => state.loading,
);
