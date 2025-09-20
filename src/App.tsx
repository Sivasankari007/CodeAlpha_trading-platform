import React, { useState, useEffect } from 'react';
import { User } from './models/User';
import { Stock } from './models/Stock';
import { MarketService } from './services/MarketService';
import { TradingService } from './services/TradingService';
import { StockCard } from './components/StockCard';
import { TradingModal } from './components/TradingModal';
import { PortfolioOverview } from './components/PortfolioOverview';
import { HoldingsTable } from './components/HoldingsTable';
import { TransactionHistory } from './components/TransactionHistory';
import { MarketOverview } from './components/MarketOverview';
import { BarChart3, User as UserIcon, Wallet, TrendingUp } from 'lucide-react';

function App() {
  const [currentUser] = useState<User>(
    new User('user_1', 'John Trader', 'john@example.com')
  );
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio' | 'history'>('market');
  const [marketService] = useState(() => new MarketService());
  const [tradingService] = useState(() => new TradingService());
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with current market data
    setStocks(marketService.getAllStocks());

    // Subscribe to market updates
    const handleMarketUpdate = (updatedStocks: Stock[]) => {
      setStocks(updatedStocks);
      tradingService.updatePortfolioWithMarketData(currentUser.id, updatedStocks);
    };

    marketService.subscribe(handleMarketUpdate);

    return () => {
      marketService.unsubscribe(handleMarketUpdate);
      marketService.destroy();
    };
  }, [marketService, tradingService, currentUser.id]);

  const handleTradeClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleTrade = (stock: Stock, type: 'buy' | 'sell', quantity: number) => {
    const result = tradingService.executeTransaction(currentUser.id, stock, type, quantity);
    
    if (result.success) {
      setNotification(result.message);
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification(result.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const portfolio = tradingService.getOrCreatePortfolio(currentUser.id);
  const holdings = portfolio.getHoldingsArray();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <img 
                src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100" 
                alt="TradePro Logo"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">TradePro</h1>
                <p className="text-xs text-gray-400">Professional Trading Platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-300">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" 
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <div>
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-400">Active Trader</div>
              </div>
            </div>
            <div className="flex items-center text-gray-300">
              <Wallet size={18} className="mr-2" />
              ${portfolio.cash.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="bg-blue-600 text-white px-6 py-3 text-center">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('market')}
            className={`pb-4 px-2 text-sm font-medium transition-colors ${
              activeTab === 'market'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 size={16} className="inline mr-2" />
            Market
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-4 px-2 text-sm font-medium transition-colors ${
              activeTab === 'portfolio'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wallet size={16} className="inline mr-2" />
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-2 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
        </div>

        {/* Market Tab */}
        {activeTab === 'market' && (
          <>
            <MarketOverview stocks={stocks} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  stock={stock}
                  onTrade={handleTradeClick}
                />
              ))}
            </div>
          </>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <>
            <PortfolioOverview portfolio={portfolio} />
            <HoldingsTable holdings={holdings} />
          </>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <TransactionHistory transactions={portfolio.transactions} />
        )}
      </div>

      {/* Trading Modal */}
      <TradingModal
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTrade={handleTrade}
        availableCash={portfolio.cash}
        availableShares={
          selectedStock ? portfolio.holdings.get(selectedStock.symbol)?.quantity || 0 : 0
        }
      />
    </div>
  );
}

export default App;