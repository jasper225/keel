import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import AccountForm from './AccountForm';
import AccountList from './AccountList';



export default function Accounts() {
    const [modalState, setModalState] = useState({ open: false, account: null });
    if (isLoading) return <p>Loading accounts ...</p>;
    if (error) return <p className='text-red-600'>Error loading accounts</p>;
    
    return (
        <div className="account-page">
          <div className="flex items-center justify-between mb-6">
              <h1 className='text-xl font-semibold text-gray-900'>Accounts</h1>            
            </div>
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
            <div>
              <AccountList onEdit={(a) => setModalState({ open: false, account: a})} />
            </div>

        </div>
  );
      
}