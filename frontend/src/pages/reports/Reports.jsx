import { useState } from 'react'
import IncomeVsExpense from "../reports/IncomeVsExpense";
import SpendByCategory from "../reports/SpendByCategory";
import { useIncomeVsExpense } from "../../hooks/useTransactions";
import { useSpendingByCategory } from '../../hooks/useTransactions';

const defaultRange = {
  startDate: new Date(new Date().getFullYear(), new Date().getFullMonth(), 1),
  endDate: new Date().toISOString().slice(0, 10),
};

export default function Reports() {
  const [dateRange, setDateRange] = useState(defaultRange); 
  const { data: incomeVsExpense, isLoading, error } = useIncomeVsExpense(dateRange.startDate, dateRange.endDate);
  const { data: spendByCategory } = useSpendingByCategory(dateRange.startDate, dateRange.endDate)

  if (isLoading) return <div style={{ padding: "2rem" }}> Loading reports...</div>
  if (error) return <div style={{ padding: "2rem", color: "red" }}></div>

  return (
    <div className="report-page">
      <div>
        <IncomeVsExpense incomeVsExpense={incomeVsExpense} dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>
      <div>
        <SpendByCategory spendByCategory={spendByCategory} dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>
    </div>
  );
}
