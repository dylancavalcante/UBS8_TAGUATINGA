import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/projetos', label: 'Projetos' },
    { to: '/horta', label: 'Horta Medicinal' },
    { to: '/publicacoes', label: 'Publicações' },
    { to: '/contato', label: 'Contato' },
  ];

  const linkStyles = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'text-primary-50 bg-secondary-30' 
        : 'text-primary-500 hover:text-secondary-30 hover:bg-neutral-100'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-ubs">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
                src={logo}
                alt= "logo ubs 8 tgs"
                className='h-10 w-auto object-containr'
                />
            <div>
              <span className="font-semibold text-neutral-900">UBS</span>
              <span className="text-primary-500 font-semibold ml-1">8 de Taguatinga</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkStyles}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkStyles}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
