export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public joinDate: Date = new Date()
  ) {}

  getFormattedJoinDate(): string {
    return this.joinDate.toLocaleDateString();
  }
}