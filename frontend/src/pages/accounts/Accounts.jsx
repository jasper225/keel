import { useState } from "react";
import Modal from "../../components/ui/Modal";
import AccountForm from "./AccountForm";
import AccountColumns from "./AccountColumns";
import "../styles/MainPage.css";

export default function Accounts() {
  const [modalState, setModalState] = useState({ open: false, account: null });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });
  if (isLoading) return <p>Loading accounts ...</p>;
  if (error) return <p className="error">Error loading accounts</p>;

  return (
    <div className="account-page">
      <div className="page-heading">
        <h1>Accounts</h1>
      </div>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, account: null })}
        title={modalState.account ? "Edit account" : "Add account"}
      >
        <AccountForm
          account={modalState.account}
          onSuccess={() => setModalState({ open: false, account: null })}
        />
      </Modal>
      <div>
      <AccountColumns sortBy={sort.sortBy} sortDir={sort.sortDir} onSort={setSort} />
      </div>
    </div>
  );
}
