export function buildCategoryTree(categories) {
    const byId = new Map(categories.map((cat) => [cat.id, { ...cat, children: [] }]));
    const roots = [];

    for (const cat of byId.values()) {
        if (cat.parent_id) {
            const parent = byId.get(cat.parent_id);
            if (parent) parent.children.push(cat);
        } else {
            roots.push(cat);
        }
    }

    return roots;
}