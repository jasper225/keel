import { useState } from "react";
import Modal from "../../components/ui/Modal";
import TagForm from "./TagForm";
import TagColumns from "./TagColumns";
import "../styles/MainPage.css";

export default function Tags() {
  const [modalState, setModalState] = useState({
    open: false,
    tag: null,
  });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });

  return (
    <div className="tags-page">
      <div className="page-heading">
        <h1>Tags</h1>
      </div>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, tag: null })}
        title={modalState.tag ? "Edit tag" : "Add tag"}
      >
        <TagForm
          tag={modalState.tag}
          onSuccess={() => setModalState({ open: false, tag: null })}
        />
      </Modal>
      <div>
        <TagColumns sortBy={sort.sortBy} sortDir={sort.sortDir} onSort={setSort} />
      </div>
    </div>
  );
}
