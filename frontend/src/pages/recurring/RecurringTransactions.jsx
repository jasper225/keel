import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import RecurringForm from './RecurringForm';
import RecurringList from './RecurringList';
import RecurringFilters from './RecurringFilters';

export default function RecurringTransactions() {
    const [modalState, setModalState] = useState({ open: false, recurringTxn: null });
    const [filters, setFilters] = useState({})
    return (
        <div className="recurring-transactions-page">
          <div className="flex items-center justify-between mb-6">
              <h1 className='text-xl font-semibold text-gray-900'>Recurring Transactions</h1>            
            </div>
          <Modal
            isOpen={modalState.open}
            onClose={() => setModalState({ open: false, recurringTxn: null })}
            title={modalState.recurringTxn ? "Edit recurring transaction" : "Add recurring transaction"}>
                <RecurringForm
                    recurringTxn={modalState.recurringTxn}
                    onSuccess={() => setModalState({ open: false, recurringTxn: null })}
                />
          </Modal>
            <div>
              <RecurringFilters filters={filters} onChange={setFilters}/>
            </div>
            <div>
              <RecurringList filters={filters} onEdit={(txn) => setModalState({ open: false, recurringTxn: txn})} />
            </div>
        </div>
    );
}