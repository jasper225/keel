import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';

export default function Transactions() {
    const [modalState, setModalState] = useState({ open: false, account: null });
    const [filters, setFilters] = useState({})
    return (
        <div className="transactions-page">
          <div className="flex items-center justify-between mb-6">
              <h1 className='text-xl font-semibold text-gray-900'>Transactions</h1>            
            </div>
          <Modal
            isOpen={modalState.open}
            onClose={() => setModalState({ open: false, transaction: null })}
            title={modalState.transaction ? "Edit transaction" : "Add transaction"}>
                <TransactionForm
                    transaction={modalState.transaction}
                    onSuccess={() => setModalState({ open: false, transaction: null })}
                />
          </Modal>
            <div>
              <TransactionFilters filters={filters} onChange={setFilters}/>
            </div>
            <div>
              <TransactionList />
            </div>
        </div>
    );
}