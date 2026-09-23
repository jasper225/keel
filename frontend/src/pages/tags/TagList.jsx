import { useParams } from "react-router-dom";
import TagRow from "./TagRow";
import { useTags, useTagCount } from "../../hooks/useTags";

export default function TagList({ sortBy, sortDir, onEdit }) {
  const { id } = useParams();
  const { data: tags, isLoading, error } = useTags(sortBy, sortDir);
  const { data: count } = useTagCount(id);
  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-600">Error loading tags</p>;

  return (
    <div className="flex flex-col space-y-2">
      {tags.length === 0 ? (
        <p className="text-gray-500">No tags yet — add one to get started.</p>
      ) : (
        <div className="space-y-2">
          {tags.map((tag) => (
            <TagRow key={tag.id} tag={tag} count={count} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
