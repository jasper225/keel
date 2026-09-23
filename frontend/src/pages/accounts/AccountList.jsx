import AccountRow from "./AccountRow";
import { useAccounts, useAccountBalance } from '../../hooks/useAccounts';
import { useParams } from "react-router-dom";


export default function AccountList({ sortBy, sortDir, onEdit}) {
    const { id } = useParams;
    const { data: accounts, isLoading, error } = useAccounts(sortBy, sortDir);
    const { data: balance } = useAccountBalance(id);
    if (isLoading) return <p>Loading accounts...</p>;
    if (error) return <p className='text-red-600'>Error loading accounts</p>;

    return (
      <div className="flex flex-col space-y-2">
        {accounts.length === 0 ? (
          <p className="text-gray-500">No accounts yet — add one to get started.</p>
            ) : (
              <div className="space-y-2">
              {accounts.map((account) => (
              <AccountRow
                key={account.id}
                account={account}
                balance={balance}
                onEdit={onEdit}
              />
              ))}
               </div>
        )}
      </div>
    )
}