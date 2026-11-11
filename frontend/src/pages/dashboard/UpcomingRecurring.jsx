import { useUpcomingRecurringTransactions } from "../../hooks/useRecurringTxn";
import RecurringRow from "../recurring/RecurringRow";
export default function UpcomingRecurring() {
  const { data: upcomingRecurring } = useUpcomingRecurringTransactions();

  return (
    <div className="m-0 min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">
        Upcoming Recurring Transactions
      </h1>
      {upcomingRecurring.map((recurring) => (
        <RecurringRow
          key={recurring.id}
          recurringTxn={recurring}
          onEdit={recurring}
        />
      ))}
    </div>
  );
}
