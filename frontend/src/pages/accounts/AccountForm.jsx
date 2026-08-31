import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useCreateAccount, useUpdateAccount } from "../../hooks/useAccounts";

const ACCOUNT_TYPE_OPTIONS = [
    { value: 'checking',  label: 'Checking' },
    { value: 'savings',  label: 'Savings' },
    { value: 'credit_card',  label: 'Credit Card' },
    { value: 'cash',  label: 'cash' },
    { value: 'investment',  label: 'Investment' },
    { value: 'loan', label: 'Loan' },
    { value: 'other', label: 'Other' }
];

const emptyForm = {
    name: '',
    type: 'checking',
    currency: 'USD',
    opening_balance: '0',
};



export default function AccountForm({ account, onSuccess }) {
   const isEditing = !!account;
   const [form, setForm] = useState(emptyForm);
   const [error, setError] = useState(false);
   
   const createAccount = useCreateAccount();
   const updateAccount = useUpdateAccount();
   const isSubmitting = createAccount.isPending || updateAccount.isPending;

   useEffect(() => {
    if (account) {
        setForm({
            name: account.name,
            type: account.type,
            currency: account.currency,
            opening_balance: account.opening_balance
        });
    }  else {
        setForm(emptyForm);
    }
   

    }, [account]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (!form.name.trim()) {
            setError("Account name required");
            return;
        }

        const payload = {
            name: form.name.trim(),
            type: form.type,
            currency: form.currency,
            opening_balance: Number(form.opening_balance) || 0,
        };

        const mutation = isEditing
            ? updateAccount.mutateAsync({ id: account.id, data: payload })
            : updateAccount.mutateAsync(payload);
        
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name:</label>
            <Input
                placeholder="Name"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <Select
                placeholder="Type"
                value={form.type}
                onChange={handleChange}
                options={ACCOUNT_TYPE_OPTIONS}
                className="w-full"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <Select
                placeholder="Currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full uppercase"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? "Opening Balance" : "Starting Balance"}
            </label>
            <Input
                type="number"
                placeholder="Opening Balance"
                value={form.opening_balance}
                onChange={handleChange}
                className="w-full"
            />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving" : isEditing ? "Save changes" : "Create Account"}
                </Button>
            </div>
        </form>
    );
}