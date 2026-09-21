import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import RecurringForm from "./RecurringForm";
import RecurringList from "./RecurringList";
import RecurringFilters from "./RecurringFilters";
import { RECURRING_LABELS } from "../../utils/constants/headerLabels";

export default function RecurringTransactions() {
  const [modalState, setModalState] = useState({
    open: false,
    recurring: null,
  });
  const [filters, setFilters] = useState({});
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
        <RecurringFilters filters={filters} onChange={setFilters} />
      </div>
      <div>
        <Header labels={RECURRING_LABELS} />
      </div>
      <div>
        <RecurringList
          filters={filters}
          onEdit={(txn) => setModalState({ open: false, recurring: txn })}
        />
      </div>
    </div>
  );
}
