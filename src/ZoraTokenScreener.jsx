import { useEffect, useState } from 'react'; import { getTokens } from './zoraAPI';

export default function ZoraTokenScreener() { const [tokens, setTokens] = useState([]); const [sortBy, setSortBy] = useState('marketCap');

useEffect(() => { async function fetchData() { const data = await getTokens(sortBy); setTokens(data); } fetchData(); }, [sortBy]);

return ( <div className="p-4 max-w-7xl mx-auto"> <h1 className="text-3xl font-bold mb-4">Zora Token Screener</h1>

<div className="mb-4">
    <label className="mr-2 font-semibold">Sort by:</label>
    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border p-1">
      <option value="marketCap">Market Cap</option>
      <option value="volume">Volume</option>
      <option value="price">Price</option>
    </select>
  </div>

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
        <tr key={token.id} className="hover:bg-gray-50">
          <td className="border p-2 text-center">{index + 1}</td>
          <td className="border p-2">{token.name}</td>
          <td className="border p-2 text-right">${token.price.toFixed(4)}</td>
          <td className="border p-2 text-right">${token.marketCap.toLocaleString()}</td>
          <td className="border p-2 text-right">${token.volume.toLocaleString()}</td>
          <td className="border p-2 text-right">{token.holders}</td>
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
</div>

); }

