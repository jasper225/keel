import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useCategories, useCreateCategory, useUpdateCategory } from "../../hooks/useCategories";

const CATEGORY_TYPE_OPTIONS = [
    { value: 'income',  label: 'Income' },
    { value: 'expense',  label: 'Expense' },
    { value: 'transfer',  label: 'Transfer' },
];

const emptyForm = {
    name: '',
    type: '',
    parent_id: ''
};

export default function CategoryForm({ category, parentId, onSuccess}) {
    const isEditing = !!category;
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState(false);
    const { data: categories } = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const isSubmitting = createCategory.isPending || updateCategory.isPending;

    const parentOptions = [
        { value: '', label: 'No parent (top level)' },
        ...(categories ?? [])
        .filter((c) => c.id !== category?.id)
        .map((c) => ({ value: c.id, label: c.name })),
     ];
    
    useEffect(() => {
        if (category) {
            setForm({
                name: category.name,
                type: category.type,
                parent_id: category.parent_id || '',
            });
        }  else {
            setForm({...emptyForm, parent_id: parentId || '' });
        }
        }, [category, parentId]);
    
    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (!form.name || !form.type) {
            setError("Category name and type required");
            return;
        }

        const payload = {
            name: form.name,
            type: form.type,
            parent_id: form.parent_id || null,
        };

        const mutation = isEditing
            ? updateCategory.mutateAsync({ id: category.id, data: payload })
            : createCategory.mutateAsync(payload);
        
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name:</label>
                <Input
                    placeholder="Category Name"
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Type:</label>
                <Select
                    placeholder="Type"
                    value={form.type}
                    onChange={handleChange('type')}
                    options={CATEGORY_TYPE_OPTIONS}
                    className="w-full"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Type:</label>
                <Select
                    placeholder="Parent Category"
                    value={form.parent_id}
                    onChange={handleChange('parent_id')}
                    options={parentOptions}
                    className="w-full"
                />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving" : isEditing ? "Save changes" : "Create Category"}
                    </Button>
                </div>
            </form>
        );
    
}