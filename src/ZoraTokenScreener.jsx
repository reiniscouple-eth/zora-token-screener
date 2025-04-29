import { useEffect, useState } from 'react'; import { getTokens } from './zoraAPI';

export default function ZoraTokenScreener() { const [tokens, setTokens] = useState([]); const [sortBy, setSortBy] = useState('marketCap'); const [loading, setLoading] = useState(true); const [error, setError] = useState(null);

useEffect(() => { async function fetchData() { setLoading(true); setError(null); try { const data = await getTokens(sortBy); setTokens(data); console.log('Fetched tokens:', data); } catch (err) { console.error('Error fetching tokens:', err); setError('Failed to load tokens.'); } setLoading(false); } fetchData(); }, [sortBy]);

return ( <div className="p-4 max-w-7xl mx-auto"> <h1 className="text-3xl font-bold mb-4 text-center">Zora Token Screener</h1>

<div className="mb-4 text-center">
    <label className="mr-2 font-semibold">Sort by:</label>
    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border p-1">
      <option value="marketCap">Market Cap</option>
      <option value="volume">Volume</option>
      <option value="price">Price</option>
    </select>
  </div>

  {loading && <p className="text-center text-gray-500">Loading tokens...</p>}
  {error && <p className="text-center text-red-500">{error}</p>}

  {!loading && !error && tokens.length > 0 && (
    <table className="table-auto w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">#</th>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Market Cap</th>
          <th className="border p-2">Volume</th>
          <th className="border p-2">Holders</th>
          <th className="border p-2">Created</th>
          <th className="border p-2">Link</th>
        </tr>
      </thead>
      <tbody>
        {tokens.slice(0, 200).map((token, index) => (
          <tr key={token.id || index} className="hover:bg-gray-50">
            <td className="border p-2 text-center">{index + 1}</td>
            <td className="border p-2">{token.name}</td>
            <td className="border p-2 text-right">${token.price?.toFixed(4) || '0.0000'}</td>
            <td className="border p-2 text-right">${token.marketCap?.toLocaleString() || '0'}</td>
            <td className="border p-2 text-right">${token.volume?.toLocaleString() || '0'}</td>
            <td className="border p-2 text-right">{token.holders || 0}</td>
            <td className="border p-2 text-right">{new Date(token.createdAt).toLocaleDateString()}</td>
            <td className="border p-2 text-center">
              <a
                href={`https://zora.co/coin/${token.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {!loading && !error && tokens.length === 0 && (
    <p className="text-center text-gray-500">No tokens found.</p>
  )}
</div>

); }

