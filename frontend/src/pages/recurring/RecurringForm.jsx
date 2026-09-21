import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useCreateRecurring, useUpdateRecurring } from "../../hooks/useRecurring";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
const { TXN_TYPE_OPTIONS, INTERVAL_UNIT_OPTIONS } = require("../../utils/constants/selectOptions");

const emptyForm = {
  account: "",
  category: "",
  type: "",
  amount: "",
  interval_unit: "",
  interval_count: "",
  next_occurence: "",
  end_date: "",
};

export default function RecurringForm({ recurring, onSuccess }) {
  const isEditing = !!recurring;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(false);

  const createRecurring = useCreateRecurring();
  const updateRecurring = useUpdateRecurring();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const isSubmitting =
    createRecurring.isPending || updateRecurring.isPending;

  const accountOptions = [
    { value: "", label: "All accounts" },
    ...(accounts ?? []).map((a) => ({ value: a.id, label: a.name })),
  ];

  const categoryOptions = [
    { value: "", label: "All categories" },
    ...(categories ?? []).map((c) => ({ value: c.id, label: c.name })),
  ];

  useEffect(() => {
    if (recurring) {
      setForm({
        account: recurring.account,
        category: recurring.category,
        type: recurring.type,
        amount: recurring.amount,
        interval_unit: recurring.interval_unit,
        interval_count: recurring.interval_count,
        next_occurence: recurring.next_occurence,
        end_date: recurring.end_date,
      });
    } else {
      setForm(emptyForm);
    }
  }, [recurring]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!form.account) {
      setError("Recurring transaction account required");
      return;
    }

    const payload = {
      account: form.account,
      category: form.category,
      type: form.type,
      amount: Number(form.amount) || 0,
      interval_unit: form.interval_unit,
      interval_count: form.interval_count,
      next_occurence: form.next_occurence,
      end_date: form.end_date,
    };

    const mutation = isEditing
      ? updateRecurring.mutateAsync({ id: recurring.id, data: payload })
      : createRecurring.mutateAsync(payload);

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
          Account
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
          Type
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
          Interval Unit
        </label>
         <Select
          placeholder="Interval Unit"
          value={form.interval_unit}
          onChange={handleChange}
          options={INTERVAL_UNIT_OPTIONS}
          className="w-full"
        />
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interval Count
        </label>
        <Input
          type="number"
          placeholder="Interval Count"
          value={form.interval_count}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Next Occurence
        </label>
        <Input
          type="date"
          placeholder="Next Occurence"
          value={form.next_occurence}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <Input
          type="number"
          placeholder="End Date"
          value={form.end_date}
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
