import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import TagSearch from "../tags/TagSearch";
import { TRANSACTION_LABELS } from "../../utils/constants/headerLabels";

export default function Transactions() {
  const [modalState, setModalState] = useState({
    open: false,
    transaction: null,
  });
  const [filters, setFilters] = useState({});
  const [tagIds, setTagIds] = useState([]);

  const handleToggleTag = (tagId) => {
    setTagIds((prev) => {
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
    });
  };
  return (
    <div className="transactions-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
      </div>
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
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <TransactionFilters filters={filters} onChange={setFilters} />
        <TagSearch selectedTagIds={tagIds} onToggleIds={handleToggleTag} />
      </div>
      <div>
        <Header labels={TRANSACTION_LABELS} />
      </div>
      <div>
        <TransactionList
          filters={filters}
          onEdit={(txn) => setModalState({ open: false, transaction: txn })}
        />
      </div>
    </div>
  );
}
