import { useParams, Link } from "react-router-dom";
import { useCategory, useCategories, useCategoryBudgets, useCategoryChildren } from "../../hooks/useCategories";
import BudgetRow from "../../pages/budgets/BudgetRow";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: category, isLoading, error } = useCategory(id);
  const { data: categories } = useCategories();
  const { data: budgets } = useCategoryBudgets(id);
  const { data: children } = useCategoryChildren(id);
  if (isLoading) return <p>Loading category ...</p>;
  if (error) return <p className="text-red-600">Error loading category</p>;

  const parent = category.parent_id
  ? categories?.find((c) => c.id === category.parent_id)
  : null;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">{category.name}</h1>
      <h2 className="font-semibold text-gray-900">Budgets</h2>
      <div className="flex flex-col space-y-2">
              {budgets.length === 0 ? (
                <p className="text-gray-500">No budgets yet for {category.name}.</p>
                  ) : (
                    <div className="space-y-2">
                    {budgets.map((budget) => (
                    <BudgetRow
                      key={budget.id}
                      budget={budget}
                      onEdit={onEdit}
                    />
                    ))}
                     </div>
              )}
      </div>
      <h2 className="font-semibold text-gray-900">Parent Category: {parent ? parent.name : "N/A"}</h2>
      <h2 className="font-semibold text-gray-900">Subcategories</h2>
      {children.map((child) => (
        <p className="font-medium text-gray-500"><Link to="/categories:id">{child.name}</Link></p>
      ))}
    </div>
  );
}
