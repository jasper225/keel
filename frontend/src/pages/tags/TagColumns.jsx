import { useParams } from "react-router-dom";
import { useTags, useTagCount } from "../../hooks/useTags";
import { TAG_LABELS } from "../../utils/constants/headerLabels";

export default function TagColumns({ sortBy, sortDir, onSort }) {
  const { id } = useParams();
  const { data: tags, isLoading, error } = useTags(sortBy, sortDir);
  const { data: count } = useTagCount(id);
  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-600">Error loading tags</p>;

  return (
    <table className="w-full border border-gray-200 bg-white rounded-md">
      <thead>
        <tr>
          {TAG_LABELS.map((col) => (
            <th
              key={col.key}
              onClick={() => onSort(col.key)}
              className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
            >
              {col.label} {sortBy === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">Details</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((tag) => (
          <tr key={tag.id} className="border-t border-gray-100">
            <td className="px-4 py-3 text-sm text-gray-900">{tag.name}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{count}</td>
            <td className="px-4 py-3 text-sm text-gray-900"><Link to={`/tags/${tag.id}`}> View Details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}