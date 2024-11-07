import fs from 'fs/promises';
import path from 'path';
import { Transaction } from '../types/transaction';

const TRANSACTIONS_FILE = path.join(process.cwd(), 'public/data/transactions.json');

export const readTransactions = async (): Promise<Transaction[]> => {
  try {
    const data = await fs.readFile(TRANSACTIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
};

export const writeTransactions = async (transactions: Transaction[]): Promise<void> => {
  try {
    await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error('Error writing transactions:', error);
    throw error;
  }
}; 