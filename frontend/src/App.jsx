import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Reports from "./pages/reports/Reports";
import Accounts from "./pages/accounts/Accounts";
import AccountDetail from "./pages/accounts/AccountDetail";
import Budgets from "./pages/budgets/Budgets";
import BudgetDetail from "./pages/accounts/BudgetDetail";
import Categories from "./pages/categories/Categories";
import RecurringTransactions from "./pages/recurring/RecurringTransactions";
import Transactions from "./pages/transactions/Transactions";
import TransactionDetail from "./pages/accounts/TransactionDetail";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/accounts" element={<Accounts />} />
                        <Route path="/accounts:accountId" element={<AccountDetail />} />
                        <Route path="/budgets" element={<Budgets />} />
                        <Route path="/budgets:budgetId" element={<BudgetDetail />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/recurringTransactions" element={<RecurringTransactions />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/tags" element={<Tags />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/transactions:transactionId" element={<TransactionDetail />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
        </BrowserRouter>
    )
}