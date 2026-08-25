import React from "react";
import { useAccounts } from '../../hooks/useAccounts'

export default function Accounts() {
    const { data: accounts, isLoading, isError } = useAccounts();


    
    return (
        <div className="account-page">
        </div>
    );
}