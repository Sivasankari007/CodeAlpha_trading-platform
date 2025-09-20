import { Portfolio } from '../models/Portfolio';
import { Transaction } from '../models/Transaction';
import { Stock } from '../models/Stock';

export class TradingService {
  private portfolios: Map<string, Portfolio> = new Map();

  getOrCreatePortfolio(userId: string): Portfolio {
    if (!this.portfolios.has(userId)) {
      this.portfolios.set(userId, new Portfolio(userId));
    }
    return this.portfolios.get(userId)!;
  }

  executeTransaction(
    userId: string, 
    stock: Stock, 
    type: 'buy' | 'sell', 
    quantity: number
  ): { success: boolean; message: string; transaction?: Transaction } {
    const portfolio = this.getOrCreatePortfolio(userId);
    const totalValue = stock.price * quantity;

    if (type === 'buy') {
      if (portfolio.cash < totalValue) {
        return { 
          success: false, 
          message: `Insufficient funds. Need $${totalValue.toFixed(2)}, have $${portfolio.cash.toFixed(2)}` 
        };
      }
    } else {
      const holding = portfolio.holdings.get(stock.symbol);
      if (!holding || holding.quantity < quantity) {
        return { 
          success: false, 
          message: `Insufficient shares. Need ${quantity}, have ${holding?.quantity || 0}` 
        };
      }
    }

    const transaction = new Transaction(
      `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      stock.symbol,
      type,
      quantity,
      stock.price,
      totalValue
    );

    portfolio.addTransaction(transaction);

    return {
      success: true,
      message: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${stock.symbol}`,
      transaction
    };
  }

  updatePortfolioWithMarketData(userId: string, stocks: Stock[]) {
    const portfolio = this.portfolios.get(userId);
    if (portfolio) {
      stocks.forEach(stock => {
        portfolio.updateHoldingPrice(stock.symbol, stock.price);
      });
    }
  }

  getPortfolio(userId: string): Portfolio | undefined {
    return this.portfolios.get(userId);
  }
}