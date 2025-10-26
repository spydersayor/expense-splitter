import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import { useLogout } from '../features/auth/useLogout';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/Button';
import { DollarSign, Moon, Sun, LogOut } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const logout = useLogout();
  const { theme, toggleTheme } = useTheme();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/' && !isAuthenticated;

  if (isAuthPage || isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate('/groups')}
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {import.meta.env.VITE_APP_NAME || 'Expense Splitter'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {isAuthenticated && (
                <>
                  <span className="text-sm text-gray-300">
                    {user?.name || user?.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 animate-slide-up">
        {children}
      </main>
    </div>
  );
}
