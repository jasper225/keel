import { useState } from "react";
import Modal from "../../components/ui/Modal";
import TagForm from "./TagForm";
import TagList from "./TagList";
import TagSearch from "./TagSearch";
export default function Tags() {
    const [modalState, setModalState] = useState({
        open: false,
        tag: null,
      });
      return (
        <div className="tags-page">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Tags</h1>
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
            <TagList
              onEdit={(tag) => setModalState({ open: true, tag })}
            />
          </div>
        </div>
      );
}