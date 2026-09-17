import TagRow from "./TagRow";
import { useTags } from '../../hooks/useTags';


export default function TagList({ onEdit }) {
    const { data: tags, isLoading, error } = useTags();
    if (isLoading) return <p>Loading transactions...</p>;
    if (error) return <p className='text-red-600'>Error loading transactions</p>;

    return (
      <div className="flex flex-col space-y-2">
        {tags.length === 0 ? (
          <p className="text-gray-500">No tags yet — add one to get started.</p>
            ) : (
              <div className="space-y-2">
              {tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                onEdit={onEdit}
              />
              ))}
               </div>
        )}
      </div>
    )
}