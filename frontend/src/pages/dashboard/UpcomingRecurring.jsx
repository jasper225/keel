import { useUpcomingRecurringTransactions } from "../../hooks/useRecurringTxn";
import RecurringRow from "../recurring/RecurringRow";
export default function UpcomingRecurring() {
  const { data: upcomingRecurring } = useUpcomingRecurringTransactions();

  return (
    <div>
      <h1 className="text-l font-semibold text-gray-900">
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
