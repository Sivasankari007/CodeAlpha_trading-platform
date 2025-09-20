export class Stock {
  constructor(
    public symbol: string,
    public name: string,
    public price: number,
    public change: number = 0,
    public changePercent: number = 0,
    public volume: number = 0,
    public marketCap: number = 0
  ) {}

  updatePrice(newPrice: number) {
    this.change = newPrice - this.price;
    this.changePercent = (this.change / this.price) * 100;
    this.price = newPrice;
  }

  isGaining(): boolean {
    return this.change > 0;
  }

  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  getFormattedChange(): string {
    const sign = this.change >= 0 ? '+' : '';
    return `${sign}${this.change.toFixed(2)} (${sign}${this.changePercent.toFixed(2)}%)`;
  }
}