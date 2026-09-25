export default function Header({ label }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
        <p className="font-medium text-gray-500">{label}</p>
    </div>
  );
}
