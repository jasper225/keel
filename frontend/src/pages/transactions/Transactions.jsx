import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow';
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';
import { useTransactions } from '../../hooks/useTransactions';

export default function Transactions() {
    const [modalState, setModalState] = useState({ open: false, account: null });
    const { data: transactions, isLoading, error } = useTransactions();
    if (isLoading) return <p>Loading transactions...</p>;
    if (error) return <p className='text-red-600'>Error loading transactions</p>;
    return (
        <div className="transactions-page">
             <Modal
                isOpen={modalState.open}
                onClose={() => setModalState({ open: false, transaction: null })}
                title={modalState.transaction ? "Edit transaction" : "Add transaction"}
            >
                <TransactionForm
                    transaction={modalState.transaction}
                    onSuccess={() => setModalState({ open: false, transaction: null })}
                />
            </Modal>
            <div className="flex items-center justify-between mb-6">
            <h1 className='text-xl font-semibold text-gray-900'>Transactions</h1>
            <Button onClick={() => setModalState({ open: true, transaction: null})}>Add Transaction</Button>
            </div>
            {transactions.length === 0 ? (
                    <p className="text-gray-500">No transactions yet — add one to get started.</p>
                  ) : (
                    <div className="space-y-2">
                      {transactions.map((transaction) => (
                        <TransactionRow
                          key={transaction.id}
                          transaction={transaction}
                          onEdit={(txn) => setModalState({ open: true, transaction: txn})}
                        />
                      ))}
                    </div>
                  )}
        </div>
    );
}