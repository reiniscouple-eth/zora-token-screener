import { createPublicClient, http } from 'viem'; import { base } from 'viem/chains'; import { Coin__factory } from '@zoralabs/coin/artifacts/typechain';

const ZORA_COIN_FACTORY = '0x6AfA9C50b5F25c87AB66279F34F8eD77d2A2F12d';

const client = createPublicClient({ chain: base, transport: http('https://mainnet.base.org') });

export async function getTokens(sortBy = 'marketCap') { try { // Essa parte exige que você tenha uma indexação local ou uma API pública // como TheGraph ou Zora Indexer. Para este exemplo, vamos buscar diretamente // os eventos de criação de moedas.

const logs = await client.getLogs({
  address: ZORA_COIN_FACTORY,
  event: {
    type: 'event',
    name: 'CoinCreated',
    inputs: [
      { indexed: true, name: 'creator', type: 'address' },
      { indexed: false, name: 'coin', type: 'address' },
      { indexed: false, name: 'name', type: 'string' },
      { indexed: false, name: 'symbol', type: 'string' }
    ]
  },
  fromBlock: 9900000n // ajuste conforme necessário
});

const tokens = await Promise.all(logs.slice(-200).map(async (log) => {
  const address = log.args.coin;
  const name = log.args.name;
  const symbol = log.args.symbol;

  const holders = Math.floor(Math.random() * 3000);
  const price = Math.random() * 0.01;
  const volume = Math.floor(Math.random() * 10000);
  const marketCap = price * holders * 1000;
  const createdAt = Date.now() - Math.floor(Math.random() * 1e9);

  return { id: address, name, symbol, address, price, marketCap, volume, holders, createdAt };
}));

return tokens.sort((a, b) => b[sortBy] - a[sortBy]);

} catch (e) { console.error('Error fetching tokens:', e); return []; } }

