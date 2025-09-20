import React from 'react';
import { Portfolio } from '../models/Portfolio';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

interface PortfolioOverviewProps {
  portfolio: Portfolio;
}

export const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolio }) => {
  const totalValue = portfolio.getTotalValue();
  const totalGainLoss = portfolio.getTotalGainLoss();
  const totalGainLossPercent = portfolio.getTotalGainLossPercent();
  const isGaining = totalGainLoss >= 0;

  return (
    <>
      {/* Portfolio Hero Section */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200" 
          alt="Portfolio Analytics Dashboard"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex items-center">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-white mb-2">Your Portfolio</h2>
            <p className="text-gray-200">Track your investments and performance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <DollarSign className="text-blue-400 mr-2" size={20} />
              <span className="text-gray-300">Total Value</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            ${totalValue.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <DollarSign className="text-green-400 mr-2" size={20} />
              <span className="text-gray-300">Cash</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            ${portfolio.cash.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {isGaining ? (
                <TrendingUp className="text-emerald-400 mr-2" size={20} />
              ) : (
                <TrendingDown className="text-red-400 mr-2" size={20} />
              )}
              <span className="text-gray-300">Day P&L</span>
            </div>
          </div>
          <div className={`text-2xl font-bold ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
            {isGaining ? '+' : ''}${totalGainLoss.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <PieChart className="text-purple-400 mr-2" size={20} />
              <span className="text-gray-300">Day P&L %</span>
            </div>
          </div>
          <div className={`text-2xl font-bold ${isGaining ? 'text-emerald-400' : 'text-red-400'}`}>
            {isGaining ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
          </div>
        </div>
      </div>
    </>
  );
};