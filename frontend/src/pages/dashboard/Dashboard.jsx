import NetWorthCard from "../dashboard/NetWorthCard";
import RecentTransactions from "../dashboard/RecentTransactions";
import UpcomingRecurring from "../dashboard/UpcomingRecurring";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2" id="dashboard">
      <NetWorthCard />
      <RecentTransactions />
      <UpcomingRecurring />
    </div>
  );
}
