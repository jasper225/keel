import "../ui/styles/Input.css";

export default function Input({ value, onChange, placeholder, className = '', type = 'text', id, required = false }){
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className}`}
        />
    );
}
