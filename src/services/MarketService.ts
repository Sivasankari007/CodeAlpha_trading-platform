import { Stock } from '../models/Stock';

export class MarketService {
  private stocks: Map<string, Stock> = new Map();
  private priceUpdateInterval?: NodeJS.Timeout;
  private subscribers: ((stocks: Stock[]) => void)[] = [];

  constructor() {
    this.initializeStocks();
    this.startPriceUpdates();
  }

  private initializeStocks() {
    const initialStocks = [
      new Stock('AAPL', 'Apple Inc.', 175.25, 2.50, 1.45, 50000000, 2800000000000),
      new Stock('GOOGL', 'Alphabet Inc.', 141.75, -1.25, -0.87, 25000000, 1800000000000),
      new Stock('MSFT', 'Microsoft Corporation', 378.85, 5.20, 1.39, 30000000, 2900000000000),
      new Stock('TSLA', 'Tesla, Inc.', 248.50, -8.75, -3.40, 75000000, 800000000000),
      new Stock('AMZN', 'Amazon.com Inc.', 145.30, 0.95, 0.66, 40000000, 1500000000000),
      new Stock('NVDA', 'NVIDIA Corporation', 875.20, 15.80, 1.84, 60000000, 2200000000000),
      new Stock('META', 'Meta Platforms Inc.', 325.75, -2.10, -0.64, 35000000, 850000000000),
      new Stock('NFLX', 'Netflix Inc.', 485.60, 8.40, 1.76, 15000000, 210000000000)
    ];

    initialStocks.forEach(stock => {
      this.stocks.set(stock.symbol, stock);
    });
  }

  private startPriceUpdates() {
    this.priceUpdateInterval = setInterval(() => {
      this.updatePrices();
    }, 3000); // Update every 3 seconds
  }

  private updatePrices() {
    for (const stock of this.stocks.values()) {
      // Simulate realistic price movements (typically small)
      const volatility = 0.02; // 2% max change per update
      const change = (Math.random() - 0.5) * 2 * volatility;
      const newPrice = stock.price * (1 + change);
      
      // Ensure price doesn't go negative
      if (newPrice > 0.01) {
        stock.updatePrice(newPrice);
        
        // Simulate volume changes
        stock.volume = Math.floor(Math.random() * 100000000);
      }
    }

    this.notifySubscribers();
  }

  subscribe(callback: (stocks: Stock[]) => void) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (stocks: Stock[]) => void) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }

  private notifySubscribers() {
    const stocksArray = Array.from(this.stocks.values());
    this.subscribers.forEach(callback => callback(stocksArray));
  }

  getAllStocks(): Stock[] {
    return Array.from(this.stocks.values());
  }

  getStock(symbol: string): Stock | undefined {
    return this.stocks.get(symbol);
  }

  destroy() {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval);
    }
  }
}