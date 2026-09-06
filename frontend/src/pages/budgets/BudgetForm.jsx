import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useCreateBudget, useUpdateBudget } from "../../hooks/useBudgets";
import { useCategories } from "../../hooks/useCategories";

const BUDGET_PERIOD_OPTIONS = [
    { value: 'weekly',  label: 'Weekly' },
    { value: 'monthly',  label: 'Monthly' },
    { value: 'yearly',  label: 'Yearly' },
];

const emptyForm = {
    category: '',
    amount_limit: '',
    period: '',
    start_date: '',
    end_date: '',
};

export default function BudgetForm({ budget, onSuccess }) {
    const isEditing = !!transaction;
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState(false);
           
    const createBudget = useCreateBudget();
    const updateBudget = useUpdateBudget();
        const { data: categories } = useCategories();

    const isSubmitting = createTransaction.isPending || updateTransaction.isPending;

    const categoryOptions = [
        { value: '', label: 'All categories' },
    ...(categories ?? []).map((c) => ({ value: c.id, label: c.name })),
     ];

    useEffect(() => {
            if (budget) {
                setForm({
                    category: budget.category,
                    amount_limit: budget.amount_limit,
                    period: budget.period,
                    start_date: budget.start_date,
                    end_date: budget.end_date,
                });
            }  else {
                setForm(emptyForm);
            }
           
        
            }, [budget]);
        
        const handleChange = (field) => (e) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            setError(null);
    
            if (!form.category) {
                setError("Budget category required");
                return;
            }
    
            const payload = {
                    category: form.category,
                    amount_limit: form.amount_limit,
                    period: form.period,
                    start_date: form.start_date,
                    end_date: form.end_date,
            };
    
            const mutation = isEditing
                ? updateBudget.mutateAsync({ id: budget.id, data: payload })
                : createBudget.mutateAsync(payload);
            
                mutation
                .then(() => onSuccess?.())
                .catch(() => setError('Something went wrong. Please try again.'));
        };

        return (
                <form onSubmit={handleSubmit} className="space-y-4">
                {error &&(
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
                    )}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                    <Select
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange('category')}
                        options={categoryOptions}
                        className="w-full"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Limit</label>
                    <Input
                        type="number"
                        placeholder="Amount Limit"
                        value={form.amount_limit}
                        onChange={handleChange}
                        className="w-full"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select
                        placeholder="Period"
                        value={form.period}
                        onChange={handleChange}
                        options={BUDGET_PERIOD_OPTIONS}
                        className="w-full"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <Input
                        type="date"
                        placeholder="Start Date"
                        value={form.start_date}
                        onChange={handleChange}
                        className="w-full"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <Input
                        type="date"
                        placeholder="End Date"
                        value={form.end_date}
                        onChange={handleChange}
                        className="w-full"
                    />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving" : isEditing ? "Save changes" : "Create Budget"}
                        </Button>
                    </div>
                    </form>
                );
}
