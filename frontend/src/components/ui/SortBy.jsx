export default function SortBy({ data, sortBy, sortDir, onChange, options }) {
    data = data;
    return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <form>
      <select
        value={sortBy}
        onChange={onChange}
        placeholder={"Sort By"}
        className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        <input type="radio" checked={sortDir='asc'}>Ascending</input>
        <input type="radio" checked={sortDir='desc'}>Descending</input>
      </form>
    </div>
  );
}
