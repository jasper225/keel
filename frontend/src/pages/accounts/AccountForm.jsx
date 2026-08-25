import React from "react";
import Input from "../../components/ui/Input";

export default function AccountForm({ onSubmit, accountData, setAccountData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({ ...accountData, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                name="name"
                type="text"
                placeholder="Name"
                value={accountData.name}
                onChange={handleChange}
            />
            <Input
                name="type"
                type="text"
                placeholder="Type"
                value={accountData.type}
                onChange={handleChange}
            />
            <Input
                name="currency"
                placeholder="Currency"
                value={accountData.currency}
                onChange={handleChange}
            />
            <Input
                name="opening-balance"
                placeholder="Opening Balance"
                value={accountData.opening_balance}
                onChange={handleChange}
            />
        </form>
        );
    }