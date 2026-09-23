import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useTags } from "../../hooks/useTags";

export default function TagSearch({ selectedTagIds, onToggleIds }) {
  const { data: tags } = useTags();
  const [query, setQuery] = useState("");

  const filtered = (tags ?? []).filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tag Name
      </label>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {filtered.map((tag) => {
        const isSelected = selectedTagIds.includes(tag.id);
        return (
          <Button
            key={tag.id}
            type="button"
            onClick={() => onToggleIds(tag.id)}
            className={`px-2 py-1 rounded-full text-xs ${
              isSelected
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            #{tag.name}
          </Button>
        );
      })}
    </div>
  );
}
