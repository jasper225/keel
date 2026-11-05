import { useState } from "react";
import Modal from "../../components/ui/Modal";
import RecurringForm from "./RecurringForm";
import RecurringColumns from "./RecurringColumns";
import "../styles/MainPage.css";


export default function RecurringTransactions() {
  const [modalState, setModalState] = useState({
    open: false,
    recurring: null,
  });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });
  if (isLoading) return <p>Loading accounts ...</p>;
  if (error) return <p className="error">Error loading accounts</p>;

  return (
    <div className="recurring-transactions-page">
      <div className="page-heading">
        <h1>
          Recurring Transactions
        </h1>
      </div>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, recurring: null })}
        title={
          modalState.recurringTxn
            ? "Edit recurring transaction"
            : "Add recurring transaction"
        }
      >
        <RecurringForm
          recurringTxn={modalState.recurring}
          onSuccess={() => setModalState({ open: false, recurring: null })}
        />
      </Modal>
      <div>
        <RecurringColumns
          sortBy={sort.sortBy} sortDir={sort.sortDir} onSort={setSort}
        />
      </div>
    </div>
  );
}
