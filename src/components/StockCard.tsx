import React from 'react';
import { Stock } from '../models/Stock';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onTrade: (stock: Stock) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onTrade }) => {
  const isGaining = stock.isGaining();
  
  // Map stock symbols to relevant company/industry images
  const getStockImage = (symbol: string) => {
    const imageMap: { [key: string]: string } = {
      'AAPL': 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      'GOOGL': 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=400',
      'MSFT': 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400',
      'TSLA': 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=400',
      'AMZN': 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      'NVDA': 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
      'META': 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      'NFLX': 'https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return imageMap[symbol] || 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400';
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105">
      <div className="mb-4">
        <img 
          src={getStockImage(stock.symbol)} 
          alt={stock.name}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
          <p className="text-gray-400 text-sm">{stock.name}</p>
        </div>
        <div className={`flex items-center ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
          {isGaining ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-1">
          {stock.getFormattedPrice()}
        </div>
        <div className={`text-sm ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
          {stock.getFormattedChange()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-400">Volume:</span>
          <div className="text-white">{stock.volume.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-gray-400">Market Cap:</span>
          <div className="text-white">${(stock.marketCap / 1000000000).toFixed(1)}B</div>
        </div>
      </div>
      
      <button
        onClick={() => onTrade(stock)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
      >
        Trade
      </button>
    </div>
  );
};