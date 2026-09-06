import Modal from '../../components/ui/Modal';
import CategoryForm from '../categories/CategoryForm';
import CategoryTree from '../categories/CategoryTree';
import { useCategories } from '../../hooks/useCategories';

export default function Categories() {
    const [modalState, setModalState] = useState({ open: false, category: null });
    const categories = useCategories();
    
    return (
        <div className="category-page">
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xl font-semibold text-gray-900'>Categories</h1>            
            </div>
            <Modal
                isOpen={modalState.open}
                onClose={() => setModalState({ open: false, category : null })}
                title={modalState.category ? "Edit category " : "Add category "}>
                    <CategoryForm
                        category={modalState.category}
                        parentId={modalState.parentId}
                        onSuccess={() => setModalState({ open: false, category: null, parentId: null })}
                    />
            </Modal>
            <CategoryTree
                categories={categories}
                onEdit={(cat) => setModalState({ open: false, category: cat, parentId: null })}
                onAddChild={(parentNode) => setModalState({ open: false, category: null, parentId: parentNode.parentId })}
            />
        </div>
    );
}