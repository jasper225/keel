import { useState } from "react";
import Modal from "../../components/ui/Modal";
import RecurringForm from "./RecurringForm";
import RecurringColumns from "./RecurringColumns";

export default function RecurringTransactions() {
  const [modalState, setModalState] = useState({
    open: false,
    recurring: null,
  });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });

  return (
    <div className="recurring-transactions-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
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
