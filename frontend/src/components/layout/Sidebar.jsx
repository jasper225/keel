import { NavLink } from "react-router-dom";
import { LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  Repeat,
  Tag,
  FolderTree,
  BarChart3, } from 'lucide-react';

  const navItems = [
    {to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true},
    {to: '/accounts', label: 'Accounts', icon: Wallet},
    {to: '/budgets', label: 'Budgets', icon: PiggyBank},
    {to: '/categories', label: 'Categories', icon: FolderTree},
    {to: '/transactions', label: 'Transactions', icon: ArrowLeftRight},
    {to: '/tags', label: 'Tags', icon: Tag},
    {to: '/recurringTransactions', label: 'Recurring Transactions', icon: Repeat},
    {to: '/reports', label: 'Reports', icon: BarChart3}
];

export function Sidebar() {
    return (
        <aside className="flex w-60 flex-col border-r border-gray-200 bg-white">
        <div className="px-6 py-5">
        <span className="text-lg font-semibold text-gray-900">Keel</span>
        </div>
         <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon size={18} />
            {label}
            </NavLink>
            ))}
         </nav>
        </aside>
    );
}