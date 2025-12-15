import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBranding } from '../contexts/BrandingContext';
import {
  FileText,
  Plus,
  Settings,
  Menu,
  X,
  Home,
  Bell,
  ChevronDown,
  FileSignature,
  Search,
  Building2,
  LogOut
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { loadBranding, branding } = useBranding();
  const location = useLocation();

  // Initialize selected account on user login or load
  useEffect(() => {
    if (user?.accounts && user.accounts.length > 0) {
      // Check if there's a saved selected account
      const savedAccountId = localStorage.getItem(`wfs-selected-account-${user.id}`);
      if (savedAccountId) {
        const savedAccount = user.accounts.find(acc => acc.id === savedAccountId);
        if (savedAccount) {
          setSelectedAccount(savedAccount);
          return;
        }
      }
      // Default to first account
      setSelectedAccount(user.accounts[0]);
      localStorage.setItem(`wfs-selected-account-${user.id}`, user.accounts[0].id);
    }
  }, [user]);

  // Load branding when selected account changes
  useEffect(() => {
    if (selectedAccount) {
      loadBranding(selectedAccount);
    }
  }, [selectedAccount, loadBranding]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Transaction', href: '/transaction/create', icon: Plus },
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', href: '/admin', icon: Settings }] : []),
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Wells Fargo Top Banner - At the very top */}
      <WellsFargoBanner user={user} />
      
      <div className="flex flex-col min-h-screen">
      
      {/* Main layout container with sidebar and content */}
      <div className="layout-container flex-1">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent
            navigation={navigation}
            isActive={isActive}
            branding={branding}
            user={user}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            showAccountDropdown={showAccountDropdown}
            setShowAccountDropdown={setShowAccountDropdown}
            loadBranding={loadBranding}
            logout={logout}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="sidebar-desktop">
        <SidebarContent
          navigation={navigation}
          isActive={isActive}
          branding={branding}
          user={user}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          showAccountDropdown={showAccountDropdown}
          setShowAccountDropdown={setShowAccountDropdown}
          loadBranding={loadBranding}
          logout={logout}
        />
      </div>

      {/* Main content */}
      <div className="main-content-wrapper">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="top-nav-content">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wells-fargo-red lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search Section */}
            <div className="search-section">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search transactions..."
                  type="search"
                />
              </div>
            </div>
            
            {/* Right Section - Notifications and Profile */}
            <div className="profile-section-right">
              {/* Notifications */}
              <button
                type="button"
                className="notification-btn"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Profile section */}
              <div className="user-profile">
                <div className="profile-avatar">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div className="profile-info">
                  <p className="profile-name">
                    {user?.name}
                  </p>
                  <p className="profile-department">
                    {user?.department}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="logout-btn"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="main-content">
          {children}
        </main>
      </div>
      </div>
      </div>
    </>
  );
};

const SidebarContent = ({ navigation, isActive, branding, user, selectedAccount, setSelectedAccount, setShowAccountDropdown, showAccountDropdown, loadBranding, logout }) => {
  return (
    <>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-400/20 rounded-lg blur-sm"></div>
            <FileSignature className="h-8 w-8 relative z-10" style={{ color: 'var(--theme-primary)' }} />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold" style={{ color: 'var(--theme-text-primary)' }}>
              {branding?.metadata?.appName || 'eSignature Studio'}
            </h1>
            <p className="text-xs font-medium" style={{ color: 'var(--theme-text-secondary)' }}>Digital Signing Platform</p>
          </div>
        </div>
      </div>

      {/* Account Switcher in Sidebar */}
      <div className="px-4 py-3">
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="group w-full flex items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-left shadow-sm hover:border-red-400 hover:bg-gray-50 transition-all"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Account
              </span>
              <span className="text-sm font-medium text-gray-900 truncate">
                {selectedAccount?.name || 'Select Account'}
              </span>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-red-500 transition-all flex-shrink-0 ${showAccountDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {showAccountDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowAccountDropdown(false)} />
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-red-200 bg-white backdrop-blur-2xl shadow-2xl p-3 z-50 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Switch account
                  </p>
                  <p className="text-xs text-gray-500">
                    Changes apply instantly.
                  </p>
                </div>

                <div className="space-y-1">
                  {user?.accounts && user.accounts.length > 0 && user.accounts.map((account) => {
                    const isActive = selectedAccount?.id === account.id;
                    return (
                      <button
                        key={account.id}
                        onClick={() => {
                          setSelectedAccount(account);
                          localStorage.setItem(`wfs-selected-account-${user.id}`, account.id);
                          loadBranding(account);
                          setShowAccountDropdown(false);
                        }}
                        className={`w-full flex items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-all ${
                          isActive
                            ? 'border-red-500/60 bg-red-50/60'
                            : 'border-gray-200 bg-white hover:border-red-400/50 hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                            isActive
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                          }`}
                        />

                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-900 block truncate">
                            {account.name}
                          </span>
                          <span className="text-xs text-gray-500 block truncate">{account.code}</span>
                        </div>

                        {isActive && (
                          <span className="text-xs font-medium text-red-600 flex-shrink-0">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      logout();
                      setShowAccountDropdown(false);
                    }}
                    className="w-full text-sm text-gray-700 hover:text-gray-900 transition-colors text-left font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
            >
              <Icon className="icon" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

// Wells Fargo Top Banner Component - Matching wellsfargo.com design
const WellsFargoBanner = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="wells-fargo-banner ps-masthead" role="banner">
      <div className="ps-masthead-wrapper">
        {/* Logo Section */}
        <div className="new_logoOuter">
          <div className="ps-logo-home">
            <Link to={user ? "/dashboard" : "/"}>
              <img 
                src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" 
                alt="Wells Fargo Home Page"
                className="h-6 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Right Navigation */}
        <nav className="ps-right-nav" aria-label="Header Navigation">
          <ul className="flex items-center space-x-4">
          </ul>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          data-role="none"
          className="ps-hamburger-link lg:hidden"
          name="hamburger-link"
          aria-expanded={mobileMenuOpen}
          aria-label="Open Menu Navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="ps-icon-bar"></div>
          <div className="ps-icon-bar"></div>
          <div className="ps-icon-bar"></div>
          <span className="text-white text-xs font-medium ml-2">MENU</span>
        </button>
      </div>

    </header>
  );
};

export default Layout;
