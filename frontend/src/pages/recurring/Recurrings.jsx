import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import SortBy from "../../components/ui/SortBy";
import RecurringForm from "./RecurringForm";
import RecurringList from "./RecurringList";
import { RECURRING_LABELS } from "../../utils/constants/headerLabels";
import { RECURRING_SORT_OPTIONS } from "../../utils/constants/sortOptions";

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
        <Header labels={RECURRING_LABELS} />
        <SortBy
          sortBy={sort.sortBy}
          sortDir={sort.sortDir}
          onSortByChange={(e) =>
            setSort((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          onSortDirChange={(dir) =>
            setSort((prev) => ({ ...prev, sortDir: dir }))
          }
          options={RECURRING_SORT_OPTIONS}
        />
      </div>
      <div>
        <RecurringList
          onEdit={(txn) => setModalState({ open: false, recurring: txn })}
        />
      </div>
    </div>
  );
}
