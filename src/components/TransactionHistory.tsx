import React from 'react';
import { Transaction } from '../models/Transaction';
import { ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  if (transactions.length === 0) {
    return (
      <>
        {/* Transaction History Hero */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Trading History Analytics"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex items-center">
            <div className="px-8">
              <h2 className="text-3xl font-bold text-white mb-2">Transaction History</h2>
              <p className="text-gray-200">Review your trading activity and performance</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <Clock className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-400 text-lg">No transactions yet</p>
        <p className="text-gray-500 text-sm mt-2">Your trading history will appear here</p>
      </div>
      </>
    );
  }

  return (
    <>
      {/* Transaction History Hero */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1200" 
          alt="Trading History Analytics"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex items-center">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-white mb-2">Transaction History</h2>
            <p className="text-gray-200">Review your trading activity and performance</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {sortedTransactions.slice(0, 10).map((transaction) => (
          <div key={transaction.id} className="px-6 py-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {transaction.type === 'buy' ? (
                  <ArrowUpCircle className="text-emerald-400 mr-3" size={20} />
                ) : (
                  <ArrowDownCircle className="text-red-400 mr-3" size={20} />
                )}
                <div>
                  <div className="text-white font-medium">
                    {transaction.type.toUpperCase()} {transaction.stockSymbol}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {transaction.quantity} shares @ ${transaction.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">
                  {transaction.getFormattedValue()}
                </div>
                <div className="text-gray-400 text-sm">
                  {transaction.timestamp.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};