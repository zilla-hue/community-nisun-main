import { Transaction } from '../types/transaction';

// Helper function to get the correct file path
const getTransactionsFilePath = () => {
  return '/data/transactions.json';
};

// Fetch all transactions
export const fetchTransactions = async (): Promise<{ transactions: Transaction[] }> => {
  try {
    const response = await fetch(getTransactionsFilePath());
    if (!response.ok) {
      // If fetch fails, try to get from localStorage
      const storedTransactions = getStoredTransactions();
      if (storedTransactions.length > 0) {
        return { transactions: storedTransactions };
      }
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    return { transactions: data };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    // Return empty array instead of throwing
    return { transactions: [] };
  }
};

// Save transactions
export const saveTransactions = async (transactions: Transaction[]): Promise<void> => {
  try {
    // Always save to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent('transactionsUpdated', {
        detail: { transactions }
      })
    );

    // Don't attempt API call in development
    if (process.env.NODE_ENV === 'production') {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactions),
      });

      if (!response.ok) {
        throw new Error('Failed to save transactions');
      }
    }
  } catch (error) {
    console.error('Error saving transactions:', error);
    // Don't throw the error, just log it
    // This prevents the 500 error from breaking the UI
  }
};

// Helper function to get transactions from localStorage
export const getStoredTransactions = (): Transaction[] => {
  try {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      return JSON.parse(storedTransactions);
    }
    return [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Helper function to merge transactions with existing data
export const mergeTransactions = (existing: Transaction[], newTransactions: Transaction[]): Transaction[] => {
  const merged = [...existing];
  newTransactions.forEach(newTrans => {
    const index = merged.findIndex(t => t.id === newTrans.id);
    if (index >= 0) {
      merged[index] = newTrans;
    } else {
      merged.push(newTrans);
    }
  });
  return merged;
};
