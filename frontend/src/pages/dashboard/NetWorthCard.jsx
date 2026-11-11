import { useNetWorth } from "../../hooks/useAccounts";

export default function NetWorthCard() {
    const { data: netWorth } = useNetWorth();
    return (
        <div className="col-span-full m-0 min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-xl font-semibold text-gray-900">Net Worth</h1>
            <h2 className="m-0 text-3xl font-semibold text-gray-900">${netWorth}</h2>
        </div>
    )
}