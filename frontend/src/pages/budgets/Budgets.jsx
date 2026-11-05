import { useState } from "react";
import Modal from "../../components/ui/Modal";
import BudgetForm from "./BudgetForm";
import BudgetColumns from "./BudgetColumns";
import "../styles/MainPage.css";


export default function Budgets() {
  const [modalState, setModalState] = useState({ open: false, budget: null });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });
  if (isLoading) return <p>Loading budgets ...</p>;
  if (error) return <p className="error">Error loading budgets</p>;
  return (
    <div className="transactions-page">
      <div className="page-heading">
        <h1>Budgets</h1>
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
        <BudgetColumns sortBy={sort.sortBy} sortDir={sort.sortDir} onSort={setSort} />
      </div>
    </div>
  );
}
