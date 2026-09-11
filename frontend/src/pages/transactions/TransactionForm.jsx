import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";

const TXN_TYPE_OPTIONS = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
  { value: "transfer", label: "Transfer" },
];

const emptyForm = {
  account: "",
  category: "",
  type: "",
  amount: "",
  date: "",
};

export default function TransactionForm({ transaction, onSuccess }) {
  const isEditing = !!transaction;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(false);

  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const isSubmitting = createTransaction.isPending || updateTransaction.isPending;

  const accountOptions = [
    { value: "", label: "All accounts" },
    ...(accounts ?? []).map((a) => ({ value: a.id, label: a.name })),
  ];

  const categoryOptions = [
    { value: "", label: "All categories" },
    ...(categories ?? []).map((a) => ({ value: a.id, label: a.name })),
  ];

  useEffect(() => {
    if (transaction) {
      setForm({
        account: transaction.account,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
      });
    } else {
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
      type: form.type,
      amount: Number(form.amount) || 0,
      date: form.date,
    };

    const mutation = isEditing
      ? updateTransaction.mutateAsync({ id: transaction.id, data: payload })
      : createTransaction.mutateAsync(payload);

    mutation
      .then(() => onSuccess?.())
      .catch(() => setError("Something went wrong. Please try again."));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transaction Account:
        </label>
        <Select
          placeholder="Account"
          value={form.account}
          onChange={handleChange("account")}
          options={accountOptions}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Select
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          options={categoryOptions}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Select
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          options={TXN_TYPE_OPTIONS}
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <Input
          type="date"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving"
            : isEditing
              ? "Save changes"
              : "Create Transaction"}
        </Button>
      </div>
    </form>
  );
}
