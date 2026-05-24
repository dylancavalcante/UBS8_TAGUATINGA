import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Leaf, 
  Settings,
  LogOut 
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const menuItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/posts', icon: FileText, label: 'Publicações' },
    { to: '/admin/criar-post', icon: PlusCircle, label: 'Nova Publicação' },
    { to: '/admin/horta', icon: Leaf, label: 'Gerenciar Horta' },
    { to: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  const linkStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-primary-500 text-white' 
        : 'text-neutral-600 hover:bg-neutral-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-4">
        <h2 className="font-semibold text-lg text-neutral-900">Painel Admin</h2>
        <p className="text-sm text-neutral-500">UBS 8 Taguatinga</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink 
            key={item.to} 
            to={item.to} 
            className={linkStyles}
            end={item.end}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
      >
        <LogOut className="w-5 h-5" />
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;
