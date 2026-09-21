import { useParams } from "react-router-dom";
import {
  useRecurring,
  useResumeRecurring,
  usePauseRecurring,
} from "../../hooks/useRecurring";
import Button from "../../components/ui/Button";

export default function RecurringDetail() {
  const { id } = useParams();
  const { data: recurring, isLoading, error } = useRecurring(id);
  const resumeRecurring = useResumeRecurring(id);
  const pauseRecurring = usePauseRecurring(id);
  if (isLoading) return <p>Loading transaction ...</p>;
  if (error)
    return <p className="text-red-600">Error loading recurring transaction</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">
        Recurring Transaction Details
      </h1>
      <h2 className="font-semibold text-gray-900">
        Account: {recurring.account}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Category: {recurring.category}
      </h2>
      <h2 className="font-semibold text-gray-900">Type: {recurring.type}</h2>
      <h2 className="font-semibold text-gray-900">
        Amount: {recurring.amount}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Period: {recurring.interval_unit}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Next Occurence: {recurring.next_occurence}
      </h2>
      <h2 className="font-semibold text-gray-900">
        End Date: {recurring.end_date}
      </h2>
      {recurring.is_active === "true" ? (
        <Button onClick={pauseRecurring}>Pause</Button>
      ) : (
        <Button onClick={resumeRecurring}>Resume</Button>
      )}
    </div>
  );
}
