import React, { useState } from 'react';
import { Stock } from '../models/Stock';
import { X, DollarSign } from 'lucide-react';

interface TradingModalProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
  onTrade: (stock: Stock, type: 'buy' | 'sell', quantity: number) => void;
  availableCash: number;
  availableShares: number;
}

export const TradingModal: React.FC<TradingModalProps> = ({
  stock,
  isOpen,
  onClose,
  onTrade,
  availableCash,
  availableShares
}) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !stock) return null;

  const totalValue = stock.price * quantity;
  const maxQuantity = tradeType === 'buy' 
    ? Math.floor(availableCash / stock.price)
    : availableShares;

  const handleTrade = () => {
    if (quantity > 0 && quantity <= maxQuantity) {
      onTrade(stock, tradeType, quantity);
      onClose();
      setQuantity(1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Trade {stock.symbol}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-lg text-white mb-2">{stock.name}</div>
          <div className="text-2xl font-bold text-white">
            {stock.getFormattedPrice()}
          </div>
        </div>

        <div className="flex mb-4">
          <button
            onClick={() => setTradeType('buy')}
            className={`flex-1 py-2 px-4 rounded-l-md font-medium transition-colors ${
              tradeType === 'buy'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={`flex-1 py-2 px-4 rounded-r-md font-medium transition-colors ${
              tradeType === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Sell
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max={maxQuantity}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="text-sm text-gray-400 mt-1">
            Max: {maxQuantity} shares
          </div>
        </div>

        <div className="bg-gray-700 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Total Value:</span>
            <span className="text-white font-bold">${totalValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              {tradeType === 'buy' ? 'Available Cash:' : 'Available Shares:'}
            </span>
            <span className="text-white">
              {tradeType === 'buy' 
                ? `$${availableCash.toFixed(2)}` 
                : `${availableShares} shares`
              }
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleTrade}
            disabled={quantity <= 0 || quantity > maxQuantity}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              tradeType === 'buy'
                ? 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600'
                : 'bg-red-600 hover:bg-red-700 disabled:bg-gray-600'
            } text-white disabled:cursor-not-allowed`}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {quantity} Shares
          </button>
        </div>
      </div>
    </div>
  );
};