import { buildCategoryTree } from "./buildCategoryTree";
import { useNavigate } from "react-router-dom";
import CategoryNode from "./CategoryNode";

export default function CategoryTree({ categories, onEdit, onAddChild }) {
  const tree = buildCategoryTree(categories);
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      {tree.map((node) => {
        <CategoryNode
          key={node.id}
          node={node}
          depth={0}
          onEdit={onEdit}
          onAddChild={onAddChild}
          onClick={() => navigate("/categories:id")}
        />;
      })}
    </div>
  );
}
