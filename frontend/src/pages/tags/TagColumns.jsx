import { useParams } from "react-router-dom";
import { useTags, useTagCount } from "../../hooks/useTags";

export default function TagColumns({ sortBy, sortDir, onEdit }) {
  const { id } = useParams();
  const { data: tags, isLoading, error } = useTags(sortBy, sortDir);
  const { data: count } = useTagCount(id);
  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-600">Error loading tags</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col space-y-2">
          {tags.map((tag) => (
            <p className="font-medium text-gray-900">{tag.name}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {tags.map((tag) => (
            <p key={tag.id} className="font-medium text-gray-900">{count}</p>
          ))}
      </div>
    </div>
  );
}