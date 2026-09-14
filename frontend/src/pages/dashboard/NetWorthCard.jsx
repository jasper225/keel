import { useNetWorth } from "../../hooks/useAccounts";

export default function NetWorthCard() {
    const { data: netWorth } = useNetWorth();
    return (
        <div>
            <h1 className='text-xl font-semibold text-gray-900'>Net Worth</h1>
            <h2 className='font-semibold text-gray-900'>${netWorth}</h2>
        </div>
    )
}