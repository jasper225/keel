import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  useCreateTag,
  useRenameTag,
} from "../../hooks/useTags";

const emptyForm = {
  name: "",
};

export default function TagForm({ tag, onSuccess }) {
  const isEditing = !!tag;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(false);

  const createTag = useCreateTag();
  const renameTag = useRenameTag();
  const isSubmitting = createTag.isPending || renameTag.isPending;


  useEffect(() => {
    if (tag) {
      setForm({
        name: tag.name,
      });
    } else {
      setForm(emptyForm);
    }
  }, [tag]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name) {
      setError("Tag name required");
      return;
    }

    const payload = {
      name: form.name,
    };

    const mutation = isEditing
      ? renameTag.mutateAsync({ id: tag.id, data: payload })
      : createTag.mutateAsync(payload);

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
          Tag Name:
        </label>
        <Input
          placeholder="Name"
          value={form.name}
          onChange={handleChange("name")}
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
