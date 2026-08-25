import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from 'lucide-react';
import { useCurrentUser, useLogout } from "../../hooks/useAuth";

export default function Navbar() { 
    const { data: user } = useCurrentUser();
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => navigate('/'),
        });
    }

    return (
         <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <div />
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
            onClick={() => navigate('/profile')}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Settings"
            >
          <Settings size={18} />
            </button>
            <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Log out"
            >
            <LogOut size={18} />
            </button>
            </div>
            </header>
    );

}