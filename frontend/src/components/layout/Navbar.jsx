import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { APP_NAME, ROUTES } from '../../constants/appConstants';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-[#1f6feb]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link to={ROUTES.HOME} className="text-base font-bold text-slate-950">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to={ROUTES.HOME} className={navClass}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to={ROUTES.DASHBOARD} className={navClass}>
                <span className="inline-flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </span>
              </NavLink>
              <Button variant="secondary" onClick={logout} aria-label="Log out">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.LOGIN} className={navClass}>
                Login
              </NavLink>
              <NavLink to={ROUTES.REGISTER} className={navClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
