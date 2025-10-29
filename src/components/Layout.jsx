import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChatbotModal from './ChatbotModal';
import { 
  FileText, 
  Plus, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Users,
  Shield,
  Bell,
  MessageCircle
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Transaction', href: '/transaction/create', icon: Plus },
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', href: '/admin', icon: Settings }] : []),
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="layout-container">
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
          <SidebarContent navigation={navigation} isActive={isActive} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="sidebar-desktop">
        <SidebarContent navigation={navigation} isActive={isActive} />
      </div>

      {/* Main content */}
      <div className="main-content-wrapper">
        {/* Top navigation */}
        <div className="top-nav">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wells-fargo-red lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="top-nav-content">
            <div className="search-section">
              <div className="search-container">
                <FileText className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search transactions..."
                  type="search"
                />
              </div>
            </div>
            
            <div className="profile-section-right">
              <button
                type="button"
                className="notification-btn"
              >
                <Bell className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="notification-btn"
                onClick={() => setChatbotOpen(true)}
                title="AI Assistant"
              >
                <MessageCircle className="h-5 w-5" />
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

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <ChatbotModal 
          isOpen={chatbotOpen} 
          onClose={() => setChatbotOpen(false)} 
          user={user}
        />
      )}
    </div>
  );
};

const SidebarContent = ({ navigation, isActive }) => {
  return (
    <>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-wells-fargo-red" />
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">Wells Fargo</h1>
            <p className="text-xs text-gray-500">Signature Platform</p>
          </div>
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

export default Layout;
