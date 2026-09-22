export default function SortBy({ data, value, onChange, options }) {
    
    const sortAscending = () => {
        [...data].sort((a,b) => a.name.localeCompare(b.name));
    };
    const sortDescending = () => {
        [...data].sort((a,b) => b.name.localeCompare(a.name));
    };
    return (
    <div>
      <form>
      <select
        value={value}
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
      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
        <input type="radio" onClick={sortAscending}>Ascending</input>
        <input type="radio" onClick={sortDescending}>Descending</input>
      </div>
      </form>
    </div>
  );
}
