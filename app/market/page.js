import MarketClient from './MarketClient';

export default function MarketPage({ searchParams = {} }) {
  const from = typeof searchParams.from === 'string' ? searchParams.from : '';
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  return <MarketClient from={from} q={q} />;
}
