import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import BudgetForm from "./BudgetForm";
import BudgetList from './BudgetList';
import BudgetFilters from './BudgetFilters';


export default function Budgets() {
    const [modalState, setModalState] = useState({ open: false, budget: null });
    const [filters, setFilters] = useState({})
    return (
        <div className="transactions-page">
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xl font-semibold text-gray-900'>Budgets</h1>            
            </div>
            <Modal
                isOpen={modalState.open}
                onClose={() => setModalState({ open: false, budget: null })}
                title={modalState.budget ? "Edit budget" : "Add budget"}>
                <BudgetForm
                    budget={modalState.budget}
                    onSuccess={() => setModalState({ open: false, budget: null })}
                />
              </Modal>
                <div>
                  <BudgetFilters filters={filters} onChange={setFilters}/>
                </div>
                <div>
                  <BudgetList filters={filters} onEdit={(b) => setModalState({ open: false, budget: b})} />
                </div>
            </div>
        );
}