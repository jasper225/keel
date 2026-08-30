export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl leading-none"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {title && <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
}