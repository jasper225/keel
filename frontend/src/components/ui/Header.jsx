export default function Header({ labels }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      {labels.map((label) => (
        <p className="font-medium text-gray-500" value={label.value}>{label.label}</p>
      ))}
    </div>
  );
}
