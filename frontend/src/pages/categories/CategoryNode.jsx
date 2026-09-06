import Button from "../../components/ui/Button";

export default function CategoryNode({ node, depth, onEdit, onAddChild }) {
    return (
    <div>
      <div
        className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50"
        style={{ paddingLeft: `${depth * 20 + 8}px` }} 
      >
        <span className="text-sm text-gray-900">{node.name}</span>
        <div className="flex gap-2">
          <Button onClick={() => onAddChild(node)} className="text-xs px-2 py-1">
            + Subcategory
          </Button>
          <Button onClick={() => onEdit(node)} className="text-xs px-2 py-1">
            Edit
          </Button>
        </div>
      </div>

      {node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <CategoryNode key={child.id} node={child} depth={depth + 1} onEdit={onEdit} onAddChild={onAddChild} />
          ))}
        </div>
      )}
    </div>
  );
}