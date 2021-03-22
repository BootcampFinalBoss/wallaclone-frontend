import translate from '../intl/translate';
const sellLabel = translate('advertsCard.sell')
const buyLabel = translate('advertsCard.buy')
const allLabel = translate('advertsCard.all')

export const saleOptions = {
  sell: { label: sellLabel, value: 'sell' },
  buy: { label: buyLabel, value: 'buy' },
  all: { label: allLabel, value: null },
};

export const sortOptions = {
  asc: { label: 'ASC', value: 1 },
  desc: { label: 'DESC', value: -1 },
};

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;

export const LIMIT_ADVERTS_API = 10;
