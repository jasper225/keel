import React from "react";
export default function AccountCard({ account }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">{account.name}</h2>
            <p className="text-gray-700 mb-2">Type: {account.type}</p>
            <p className="text-gray-700 mb-2">Currency: {account.currency}</p>
            <p className="text-gray-700 mb-2">Balance: {account.balance}</p>
        </div>
    );
}