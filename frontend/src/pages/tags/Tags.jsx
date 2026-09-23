import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Header from "../../components/ui/Header";
import SortBy from "../../components/ui/SortBy";
import TagForm from "./TagForm";
import TagList from "./TagList";
import { TAG_LABELS } from "../../utils/constants/headerLabels";
import { TAG_SORT_OPTIONS } from "../../utils/constants/sortOptions";
export default function Tags() {
  const [modalState, setModalState] = useState({
    open: false,
    tag: null,
  });
  const [sort, setSort] = useState({ sortBy: "name", sortDir: "asc" });

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
        <Header labels={TAG_LABELS} />
        <SortBy
          sortBy={sort.sortBy}
          sortDir={sort.sortDir}
          onSortByChange={(e) =>
            setSort((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          onSortDirChange={(dir) =>
            setSort((prev) => ({ ...prev, sortDir: dir }))
          }
          options={TAG_SORT_OPTIONS}
        />
      </div>
      <div>
        <TagList
          sortBy={sort.sortBy}
          sortDir={sort.sortDir}
          onEdit={(tag) => setModalState({ open: true, tag })}
        />
      </div>
    </div>
  );
}
