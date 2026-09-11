import RecurringRow from '../recurring/RecurringRow';
import { useRecurringTransactions } from '../../hooks/useRecurringTxn';


export default function RecurringList({ filters, onEdit}) {
    const { data: recurringTxns, isLoading, error } = useRecurringTransactions(filters);
    if (isLoading) return <p>Loading transactions...</p>;
    if (error) return <p className='text-red-600'>Error loading transactions</p>;

    return (
      <div className="flex flex-col space-y-2">
        {recurringTxns.length === 0 ? (
          <p className="text-gray-500">No transactions yet — add one to get started.</p>
            ) : (
              <div className="space-y-2">
              {recurringTxns.map((recurringTxn) => (
              <RecurringRow
                key={recurringTxn.id}
                recurringTxn={recurringTxn}
                onEdit={onEdit}
              />
              ))}
               </div>
        )}
      </div>
    )
}