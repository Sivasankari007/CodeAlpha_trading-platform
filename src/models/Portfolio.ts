import { Transaction } from './Transaction';

export interface PortfolioHolding {
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  totalValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
}

export class Portfolio {
  public holdings: Map<string, PortfolioHolding> = new Map();
  public transactions: Transaction[] = [];
  public cash: number;

  constructor(
    public userId: string,
    initialCash: number = 100000
  ) {
    this.cash = initialCash;
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    
    if (transaction.type === 'buy') {
      this.buyStock(transaction);
    } else {
      this.sellStock(transaction);
    }
  }

  private buyStock(transaction: Transaction) {
    const existing = this.holdings.get(transaction.stockSymbol);
    
    if (existing) {
      const totalQuantity = existing.quantity + transaction.quantity;
      const totalCost = (existing.avgCost * existing.quantity) + transaction.totalValue;
      existing.avgCost = totalCost / totalQuantity;
      existing.quantity = totalQuantity;
    } else {
      this.holdings.set(transaction.stockSymbol, {
        symbol: transaction.stockSymbol,
        quantity: transaction.quantity,
        avgCost: transaction.price,
        currentPrice: transaction.price,
        totalValue: transaction.totalValue,
        unrealizedGain: 0,
        unrealizedGainPercent: 0
      });
    }
    
    this.cash -= transaction.totalValue;
  }

  private sellStock(transaction: Transaction) {
    const existing = this.holdings.get(transaction.stockSymbol);
    
    if (existing) {
      existing.quantity -= transaction.quantity;
      if (existing.quantity <= 0) {
        this.holdings.delete(transaction.stockSymbol);
      }
    }
    
    this.cash += transaction.totalValue;
  }

  updateHoldingPrice(symbol: string, newPrice: number) {
    const holding = this.holdings.get(symbol);
    if (holding) {
      holding.currentPrice = newPrice;
      holding.totalValue = holding.quantity * newPrice;
      holding.unrealizedGain = holding.totalValue - (holding.quantity * holding.avgCost);
      holding.unrealizedGainPercent = (holding.unrealizedGain / (holding.quantity * holding.avgCost)) * 100;
    }
  }

  getTotalValue(): number {
    let total = this.cash;
    for (const holding of this.holdings.values()) {
      total += holding.totalValue;
    }
    return total;
  }

  getTotalGainLoss(): number {
    let total = 0;
    for (const holding of this.holdings.values()) {
      total += holding.unrealizedGain;
    }
    return total;
  }

  getTotalGainLossPercent(): number {
    const totalInvested = this.getTotalValue() - this.getTotalGainLoss();
    return totalInvested > 0 ? (this.getTotalGainLoss() / totalInvested) * 100 : 0;
  }

  getHoldingsArray(): PortfolioHolding[] {
    return Array.from(this.holdings.values());
  }
}