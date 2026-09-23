import RecurringRow from "../recurring/RecurringRow";
import { useRecurrings } from "../../hooks/useRecurring";

export default function RecurringList({ sortBy, sortDir, onEdit }) {
  const { data: recurrings, isLoading, error } = useRecurrings(sortBy, sortDir);
  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-600">Error loading transactions</p>;

  return (
    <div className="flex flex-col space-y-2">
      {recurrings.length === 0 ? (
        <p className="text-gray-500">
          No transactions yet — add one to get started.
        </p>
      ) : (
        <div className="space-y-2">
          {recurrings.map((recurrings) => (
            <RecurringRow
              key={recurrings.id}
              recurring={recurrings}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
