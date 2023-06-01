import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { ICurrenciesData } from 'src/app/shared/interfaces/currencies';
import { selectCurrencies } from 'src/app/state/currency/currency.reducer';
import { AppState } from 'src/app/state/state';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  firstCurrencyForm!: FormGroup;
  secondCurrencyForm!: FormGroup;
  currenciesData?: ICurrenciesData;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrencies)
      ?.pipe(take(2))
      .subscribe((el) => {(this.currenciesData = el.data)
      console.log(el.data)});
    this.firstCurrencyForm = this.formBuilder.group({
      CurrencyAmount: [null],
      CurrencyType: ['EUR'],
    });
    this.secondCurrencyForm = this.formBuilder.group({
      CurrencyAmount: [null],
      CurrencyType: ['UAH'],
    });
    this.firstCurrencyForm.valueChanges.subscribe(() => {
      this.calculateExchange(this.firstCurrencyForm, this.secondCurrencyForm);
    });
    this.secondCurrencyForm.valueChanges.subscribe(() => {
      this.calculateExchange(this.secondCurrencyForm, this.firstCurrencyForm);
    });
  }

  calculateExchange(fromForm: FormGroup, toForm: FormGroup): void {
    const fromAmount = fromForm.get('CurrencyAmount')?.value;
    const fromType = fromForm.get('CurrencyType')?.value;
    const toType = toForm.get('CurrencyType')?.value;
    const fromValue = this.currenciesData![fromType].value;
    const toValue = this.currenciesData![toType].value;

    if (fromAmount && fromValue && toValue) {
      const toAmount = (toValue * (fromAmount / fromValue)).toFixed(3);
      toForm.get('CurrencyAmount')?.setValue(toAmount, { emitEvent: false });
    }
  }
}
