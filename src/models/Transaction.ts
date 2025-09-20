export class Transaction {
  public timestamp: Date;
  
  constructor(
    public id: string,
    public userId: string,
    public stockSymbol: string,
    public type: 'buy' | 'sell',
    public quantity: number,
    public price: number,
    public totalValue: number,
    timestamp?: Date
  ) {
    this.timestamp = timestamp || new Date();
  }

  getFormattedValue(): string {
    return `$${this.totalValue.toFixed(2)}`;
  }

  getFormattedTimestamp(): string {
    return this.timestamp.toLocaleDateString() + ' ' + this.timestamp.toLocaleTimeString();
  }
}