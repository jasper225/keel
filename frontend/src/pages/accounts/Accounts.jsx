import { useState } from "react";
import { useAccounts } from "../../hooks/useAccounts";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import SortBy from "../../components/ui/SortBy";
import AccountForm from "./AccountForm";
import AccountList from "./AccountList";
const { ACCOUNT_LABELS } = require("../../utils/constants/headerLabels");
const { ACCOUNT_SORT_OPTIONS } = require("../../utils/constants/sortOptions");

export default function Accounts() {
  const [modalState, setModalState] = useState({ open: false, account: null });
  const [sort, setSort] = useState({ sortBy: 'name', sortDir: 'asc' });
  const { data: accounts } = useAccounts(sort.sortBy, sort.sortDir);

  const handleSortChange = (field) => (e) => {
        setSort((prev) => ({ ...prev, [field]: e.target.value }));
  };
  if (isLoading) return <p>Loading accounts ...</p>;
  if (error) return <p className="text-red-600">Error loading accounts</p>;

  return (
    <div className="account-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Accounts</h1>
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
      <div className="flex items-center justify-between">
        <Header labels={ACCOUNT_LABELS}/>
        <SortBy data={accounts} sortBy={sort.sortBy} sortDir={sort.sortDir} onChange={handleSortChange} options={ACCOUNT_SORT_OPTIONS} />
      </div>
      <div>
        <AccountList
          onEdit={(a) => setModalState({ open: false, account: a })}
        />
      </div>
    </div>
  );
}
