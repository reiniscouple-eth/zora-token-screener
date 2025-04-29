import { getCoinsMostValuable } from '@zoralabs/coins-sdk';

export async function getTokens(sortBy = 'marketCap') { try { const response = await getCoinsMostValuable({ count: 200 }); const coins = response?.data?.exploreList?.edges?.map((edge) => edge.node) || [];

return coins.map((coin, index) => ({
  id: coin.address || index,
  name: coin.name || 'Unknown',
  symbol: coin.symbol || '---',
  address: coin.address || '',
  price: parseFloat(coin.price || '0'),
  marketCap: parseFloat(coin.marketCap || '0'),
  volume: parseFloat(coin.volume24h || '0'),
  holders: coin.uniqueHolders || 0,
  createdAt: coin.createdAt ? new Date(coin.createdAt) : new Date()
})).sort((a, b) => b[sortBy] - a[sortBy]);

} catch (error) { console.error('Error fetching tokens from Zora SDK:', error); return []; } }

