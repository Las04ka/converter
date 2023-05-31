export interface ICurrencies {
  meta: {
    last_updated_at: string;
  };
  data: {
    [key: string]: ICurrency;
  };
}

export interface ICurrency {
  code: string;
  value: number;
}
