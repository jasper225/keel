import { buildCategoryTree } from "./buildCategoryTree";
import CategoryNode from "./CategoryNode";

export default function CategoryTree({ categories, onEdit, onAddChild }) {
    const tree = buildCategoryTree(categories);

    return (
        <div className="space-y-1">
            {tree.map((node) => {
                <CategoryNode key={node.id} node={node} depth={0} onEdit={onEdit} onAddChild={onAddChild} />
            })}
        </div>
    )
}