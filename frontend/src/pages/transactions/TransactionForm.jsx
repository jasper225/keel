import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useCreateTransaction, useUpdateTransaction } from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";

const emptyForm = {
    account: 'checkingAccount',
    category: 'groceries',
    amount: '10.00',

};

export default function TransactionForm({ transaction, onSuccess}) {
    const isEditing = !!transaction;
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState(false);
       
    const createTransaction = useCreateTransaction();
    const updateTransaction = useUpdateTransaction();
    const accounts = useAccounts();
    const categories = useCategories();
    const isSubmitting = createTransaction.isPending || updateTransaction.isPending;

    useEffect(() => {
        if (transaction) {
            setForm({
                account: transaction.account,
                category: transaction.category,
                amount: transaction.amount
            });
        }  else {
            setForm(emptyForm);
        }
       
    
        }, [transaction]);
    
    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (!form.account) {
            setError("Transaction account required");
            return;
        }

        const payload = {
            account: form.account,
            category: form.category,
            amount: Number(form.amount) || 0,
        };

        const mutation = isEditing
            ? updateTransaction.mutateAsync({ id: transaction.id, data: payload })
            : updateTransaction.mutateAsync(payload);
        
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Account:</label>
                <Select
                    placeholder="Account"
                    value={form.account}
                    onChange={handleChange('account')}
                    options={accounts}
                    className="w-full"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    options={categories}
                    className="w-full"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                </label>
                <Input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full"
                />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving" : isEditing ? "Save changes" : "Create Transaction"}
                    </Button>
                </div>
            </form>
        );
    
}