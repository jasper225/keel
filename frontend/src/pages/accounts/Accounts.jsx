import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import AccountForm from './AccountForm';
import AccountRow from './AccountRow';
import { useAccounts } from '../../hooks/useAccounts';



export default function Accounts() {
    const [modalState, setModalState] = useState({ open: false, account: null });
    const { data: accounts, isLoading, error } = useAccounts();

    if (isLoading) return <p>Loading accounts ...</p>;
    if (error) return <p className='text-red-600'>Error loading accounts</p>;
    
    return (
        <div className="account-page">
            <Modal
                isOpen={modalState.open}
                onClose={() => setModalState({ open: false, account: null })}
                title={modalState.account ? "Edit account" : "Add account"}
            >
                <AccountForm
                    account={modalState.account}
                    onSuccess={() => setModalState({ open: false, account: null })}
                />
            </Modal>
            <div className="flex items-center justify-between mb-6">
            <h1 className='text-xl font-semibold text-gray-900'>Accounts</h1>
            <Button onClick={() => setModalState({ open: true, account: null})}>Add Account</Button>
            </div>

            {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts yet — add one to get started.</p>
      ) : (
        <div className="space-y-2">
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onEdit={(acc) => setModalState({ open: true, account: acc})}
            />
          ))}
        </div>
      )}
    </div>
  );
      
}