export interface Transaction {
  id: string | number;
  date: string;
  category: string;
  payee: string;
  amount: number;
  account: string;
  notes?: string;
}
