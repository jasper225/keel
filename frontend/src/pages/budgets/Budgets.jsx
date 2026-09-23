import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import SortBy from "../../components/ui/SortBy";
import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import { BUDGET_LABELS } from "../../utils/constants/headerLabels";
import { BUDGET_SORT_OPTIONS } from "../../utils/constants/sortOptions";

export default function Budgets() {
  const [modalState, setModalState] = useState({ open: false, budget: null });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });
  return (
    <div className="transactions-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Budgets</h1>
      </div>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, budget: null })}
        title={modalState.budget ? "Edit budget" : "Add budget"}
      >
        <BudgetForm
          budget={modalState.budget}
          onSuccess={() => setModalState({ open: false, budget: null })}
        />
      </Modal>
      <div>
        <Header labels={BUDGET_LABELS} />
        <SortBy
          sortBy={sort.sortBy}
          sortDir={sort.sortDir}
          onSortByChange={(e) =>
            setSort((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          onSortDirChange={(dir) =>
            setSort((prev) => ({ ...prev, sortDir: dir }))
          }
          options={BUDGET_SORT_OPTIONS}
        />
      </div>
      <div>
        <BudgetList
          onEdit={(b) => setModalState({ open: true, budget: b })}
        />
      </div>
    </div>
  );
}
