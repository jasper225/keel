import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import AccountForm from './AccountForm';
import { useAccounts, useAccountBalance } from '../../hooks/useAccounts';



export default function Accounts() {
    const [modalState, setModalState] = useState({ open: false, account: null });
    const { data: accounts, isLoading, error } = useAccounts();
    const { data: accountBalances } = useAccountBalance();

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
            <div
              key={account.id}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-900">{account.name}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {account.type.replace('_', ' ')} · {account.currency}
                </p>
              </div>
              <Button onClick={() => setModalState({ open: true, account })}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
      
}