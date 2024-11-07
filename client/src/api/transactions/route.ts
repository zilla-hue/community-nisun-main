import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'transactions.json');

async function readTransactions() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
}

async function writeTransactions(transactions: any[]) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error('Error writing transactions:', error);
  }
}

export async function GET() {
  const transactions = await readTransactions();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  try {
    const newTransaction = await request.json();

    // Read the current transactions
    const filePath = path.join(process.cwd(), 'public', 'data', 'transactions.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const transactions = JSON.parse(fileContent);

    // Generate a new ID for the transaction
    const newId = Math.max(...transactions.map((t: any) => t.id), 0) + 1;
    const newTransactionWithId = { id: newId, ...newTransaction };

    // Add the new transaction to the existing transactions
    const updatedTransactions = [...transactions, newTransactionWithId];

    // Write the updated transactions back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedTransactions, null, 2));

    return NextResponse.json(newTransactionWithId, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const updatedTransaction = await request.json();
  const transactions = await readTransactions();
  
  const index = transactions.findIndex((t: any) => t.id === updatedTransaction.id);
  if (index !== -1) {
    transactions[index] = updatedTransaction;
    await writeTransactions(transactions);
    return NextResponse.json(updatedTransaction);
  }
  
  return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let transactions = await readTransactions();
  
  transactions = transactions.filter((t: any) => t.id !== id);
  await writeTransactions(transactions);
  
  return NextResponse.json({ success: true });
}
