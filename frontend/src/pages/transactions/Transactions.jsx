import { useState } from "react";
import Modal from "../../components/ui/Modal";
import TransactionForm from "./TransactionForm";
import TransactionColumns from "./TransactionColumns";
import TransactionFilters from "./TransactionFilters";
import TagSearch from "../tags/TagSearch";
import "../styles/MainPage.css";

export default function Transactions() {
  const [modalState, setModalState] = useState({
    open: false,
    transaction: null,
  });
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });
  const [tagIds, setTagIds] = useState([]);
  if (isLoading) return <p>Loading accounts ...</p>;
  if (error) return <p className="error">Error loading accounts</p>;

  const handleToggleTag = (tagId) => {
    setTagIds((prev) => {
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
    });
  };
  return (
    <div className="transactions-page">
      <div className="page-heading">
        <h1>Transactions</h1>
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
        <TransactionColumns filters={filters} sortBy={sort.sortBy} sortDir={sort.sortBy} onSort={setSort} />
      </div>
    </div>
  );
}
