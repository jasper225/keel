import { Outlet } from 'react-router-dom';
import { Navbar } from '../layout/Navbar';
import { Sidebar } from '../layout/Sidebar';
import "../layout/styles/AppLayout.css";

export function AppLayout() {
    return (
        <div className="sidebar">
            <Sidebar />
         <div className="navbar">
            <Navbar />
         </div>
         <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
         </main>
        </div>
    )
}