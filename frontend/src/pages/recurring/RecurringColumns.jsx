import { useRecurrings } from "../../hooks/useRecurring";

export default function RecurringColumns({ sortBy, sortDir }) {
  const { data: recurrings, isLoading, error } = useRecurrings(sortBy, sortDir);
  if (isLoading) return <p>Loading recurring transactions...</p>;
  if (error) return <p className="text-red-600">Error loading recurring transactions</p>;
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.account_id}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.category_id}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.amount}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.interval_unit}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.next_occurence}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {recurrings.map((recurring) => (
            <p className="font-medium text-gray-900">{recurring.end_date}</p>
          ))}
      </div>
    </div>
  );
}