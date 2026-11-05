import Modal from "../../components/ui/Modal";
import CategoryForm from "../categories/CategoryForm";
import CategoryTree from "../categories/CategoryTree";
import { useCategories } from "../../hooks/useCategories";
import "../styles/MainPage.css";


export default function Categories() {
  const [modalState, setModalState] = useState({ open: false, category: null });
  const categories = useCategories();
  if (isLoading) return <p>Loading category tree ...</p>;
  if (error) return <p className="error">Error loading category tree</p>;

  return (
    <div className="category-page">
      <div className="page-heading">
        <h1>Categories</h1>
      </div>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, category: null })}
        title={modalState.category ? "Edit category " : "Add category "}
      >
        <CategoryForm
          category={modalState.category}
          parentId={modalState.parentId}
          onSuccess={() =>
            setModalState({ open: false, category: null, parentId: null })
          }
        />
      </Modal>
      <CategoryTree
        categories={categories}
        onEdit={(cat) =>
          setModalState({ open: false, category: cat, parentId: null })
        }
        onAddChild={(parentNode) =>
          setModalState({
            open: false,
            category: null,
            parentId: parentNode.parentId,
          })
        }
      />
    </div>
  );
}
