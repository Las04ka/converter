export interface ICurrencies {
  meta: {
    last_updated_at: string;
  };
  data: ICurrenciesData
}

export interface ICurrenciesData{
  [key: string]: ICurrency;
}

export interface ICurrency {
  code: string;
  value: number;
}
