import React from 'react';
import { PortfolioHolding } from '../models/Portfolio';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HoldingsTableProps {
  holdings: PortfolioHolding[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  if (holdings.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <img 
          src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="Empty Portfolio"
          className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover opacity-50"
        />
        <p className="text-gray-400 text-lg">No holdings yet</p>
        <p className="text-gray-500 text-sm mt-2">Start trading to build your portfolio</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Holdings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Avg Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                P&L %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {holdings.map((holding) => {
              const isGaining = holding.unrealizedGain >= 0;
              return (
                <tr key={holding.symbol} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{holding.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {holding.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${holding.avgCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${holding.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    ${holding.totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isGaining ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      {isGaining ? '+' : ''}${holding.unrealizedGain.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isGaining ? '+' : ''}{holding.unrealizedGainPercent.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};