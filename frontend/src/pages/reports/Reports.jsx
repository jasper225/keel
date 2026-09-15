import { useState } from 'react'
import IncomeVsExpense from "../reports/IncomeVsExpense";
import SpendByCategory from "../reports/SpendByCategory";
import { useIncomeVsExpense, useSpendingByCategory } from "../../hooks/useTransactions";
const { defaultRange } = require("../../utils/constants");


export default function Reports() {
  const [dateRange, setDateRange] = useState(defaultRange); 
  const { data: incomeVsExpense, isLoading: loadingIncome, error: incomeError } = useIncomeVsExpense(dateRange.startDate, dateRange.endDate);
  const { data: spendByCategory, isLoading: loadingSpending, error: spendingError } = useSpendingByCategory(dateRange.startDate, dateRange.endDate)

  if (loadingIncome || loadingSpending) return <div style={{ padding: "2rem" }}> Loading ...</div>
  if (incomeError || spendingError) return <div style={{ padding: "2rem", color: "red" }}> Error loading data</div>

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
