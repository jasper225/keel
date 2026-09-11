import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { useTags } from "../../hooks/useTags";

const TXN_TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
  { value: "transfer", label: "Transfer" },
];

export default function TransactionFilters({ filters, onChange }) {
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const { data: tags } = useTags();

  const accountOptions = [
    { value: "", label: "All accounts" },
    ...(accounts ?? []).map((a) => ({ value: a.id, label: a.name })),
  ];

  const categoryOptions = [
    { value: "", label: "All categories" },
    ...(categories ?? []).map((c) => ({ value: c.id, label: c.name })),
  ];

  const tagOptions = [
    { value: "", label: "All tags" },
    ...(tags ?? []).map((t) => ({ value: t.id, label: t.name })),
  ];

  const handleFieldChange = (field) => (e) => {
    onChange((prev) => ({ ...prev, [field]: e.target.value || undefined }));
  };

  const handleReset = () => {
    onChange({});
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);
  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From
        </label>
        <Input
          type="date"
          value={filters.from || ""}
          onChange={handleFieldChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To
        </label>
        <Input
          type="date"
          value={filters.to || ""}
          onChange={handleFieldChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account
        </label>
        <Select
          value={filters.accountId || ""}
          options={accountOptions}
          onChange={handleFieldChange("accountId")}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Select
          value={filters.categoryId || ""}
          options={categoryOptions}
          onChange={handleFieldChange("categoryId")}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tag
        </label>
        <Select
          value={filters.tagId || ""}
          options={tagOptions}
          onChange={handleFieldChange("tagId")}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <Select
          value={filters.type || ""}
          options={TXN_TYPE_OPTIONS}
          onChange={handleFieldChange("type")}
          className="w-full"
        />
      </div>
      {hasActiveFilters && (
        <Button onClick={handleReset} className="bg-gray-500 hover:bg-gray-600">
          Clear Filters
        </Button>
      )}
    </div>
  );
}
