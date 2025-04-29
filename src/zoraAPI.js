import { getCreatedCoins } from '@zoralabs/coins-sdk';

export async function getTokens(sortBy = 'marketCap') {
  try {
    const coins = await getCreatedCoins({
      limit: 200,        // Pega os 200 tokens mais recentes
      sortBy: sortBy     // Pode ser 'marketCap', 'volume', ou 'price'
    });

    // Transformar os dados para o formato que o app espera
    return coins.map((coin) => ({
      id: coin.address,
      name: coin.name,
      symbol: coin.symbol,
      address: coin.address,
      price: coin.price?.usd || 0,
      marketCap: coin.marketCap?.usd || 0,
      volume: coin.volume?.usd || 0,
      holders: coin.holdersCount || 0,
      createdAt: coin.createdAt ? new Date(coin.createdAt) : new Date()
    }));
  } catch (error) {
    console.error('Error fetching tokens from Zora SDK:', error);
    return [];
  }
}
