import React from 'react';
import { Stock } from '../models/Stock';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketOverviewProps {
  stocks: Stock[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ stocks }) => {
  const gainers = stocks.filter(s => s.change > 0).length;
  const losers = stocks.filter(s => s.change < 0).length;
  const avgChange = stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;

  return (
    <>
      {/* Hero Section with Market Image */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200" 
          alt="Stock Market Trading Floor"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex items-center">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-white mb-2">Live Market Data</h2>
            <p className="text-gray-200">Real-time stock prices and market analytics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <TrendingUp className="text-emerald-400 mr-2" size={20} />
            <span className="text-gray-300">Gainers</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-400">
          {gainers}
        </div>
        <div className="text-sm text-gray-400">
          out of {stocks.length} stocks
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <TrendingDown className="text-red-400 mr-2" size={20} />
            <span className="text-gray-300">Losers</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-red-400">
          {losers}
        </div>
        <div className="text-sm text-gray-400">
          out of {stocks.length} stocks
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Activity className="text-blue-400 mr-2" size={20} />
            <span className="text-gray-300">Market Avg</span>
          </div>
        </div>
        <div className={`text-2xl font-bold ${avgChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
        </div>
        <div className="text-sm text-gray-400">
          across all stocks
        </div>
      </div>
    </div>
    </>
  );
};