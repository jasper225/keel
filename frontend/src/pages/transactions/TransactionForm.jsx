import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import TagSearch from "../tags/TagSearch";
import { useCreateTransaction, useUpdateTransaction, useTransactionTags, useAttachTag, useDetachTag } from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
const { TXN_TYPE_OPTIONS } = require("../../utils/constants/selectOptions");

const emptyForm = {
  account: "",
  category: "",
  type: "",
  amount: "",
  occured_at: new Date().toISOString().slice(0, 10),
};

export default function TransactionForm({ transaction, onSuccess }) {
  const isEditing = !!transaction;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const attachTag = useAttachTag();
  const detachTag = useDetachTag();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const { data: existingTags } = useTransactionTags(transaction?.id);
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
        occured_at: transaction.occured_at,
      });
    } else {
      setForm(emptyForm),
      setSelectedTags([]);
    }
  }, [transaction]);

  useEffect(() => {
    if (existingTags) {
      setSelectedTags(existingTags.map((t) => t.id));
    }
  }, [existingTags]);

  const handleToggleTag = (tagId) => {
    setSelectedTags((prev) => prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId])
  };
  
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const syncTags = async(transactionId, previousTags = []) => {
    const toAttach = selectedTags.filter((id) => !previousTags.includes(id));
    const toDetach = selectedTags.filter((id) => selectedTags.includes(id));

    await Promise.all([
      ...toAttach.map((tagId) => attachTag({transactionId, tagId })),
      ...toDetach.map((tagId) => detachTag({transactionId, tagId })),  
    ])
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.account || !form.amount) {
      setError("Transaction account and amount are required");
      return;
    }

    const payload = { ...form, amount: Number(form.amount) };

      try {
        if (isEditing) {
          await updateTransaction.mutateAsync({ id: transaction.id, data: payload });
          const previousTagIds = (existingTags ?? []).map((t) => t.id);
          await syncTags(transaction.id, previousTagIds);
        } else {
          const created = await createTransaction.mutateAsync(payload);
          await syncTags(created.id, []);
        }
        onSuccess?.();
      } catch {
        setError('Something went wrong. Please try again.');
      }
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <TagSearch selectedTagIds={selectedTags} onToggleIds={handleToggleTag}/>
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
