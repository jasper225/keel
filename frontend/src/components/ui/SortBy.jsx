export default function SortBy({
  sortBy,
  sortDir,
  onSortByChange,
  onSortDirChange,
  options,
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <form>
        <select
          value={sortBy}
          onChange={onSortByChange}
          className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="radio"
          name="sortDir"
          checked={sortDir === "asc"}
          onChange={() => onSortDirChange}
        >
          Ascending
        </input>
        <input
          type="radio"
          name="sortDir"
          checked={sortDir === "desc"}
          onChange={() => onSortDirChange}
        >
          Descending
        </input>
      </form>
    </div>
  );
}
