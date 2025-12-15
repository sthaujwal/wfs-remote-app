import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBranding } from '../contexts/BrandingContext';
import { Shield, Lock, Mail, ArrowRight, Building2, FileSignature, PenTool, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveUsername, setSaveUsername] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { login } = useAuth();
  const { branding } = useBranding();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const demoAccounts = [
    { email: 'admin@wellsfargo.com', password: 'admin123', role: 'Admin', icon: Shield },
    { email: 'user@wellsfargo.com', password: 'user123', role: 'User', icon: Building2 },
    { email: 'manager@wellsfargo.com', password: 'manager123', role: 'Manager', icon: Building2 }
  ];

  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  // Stagecoach SVG Component
  const StagecoachIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stagecoach body */}
      <rect x="30" y="50" width="140" height="50" rx="5" fill="currentColor" opacity="0.15"/>
      <rect x="40" y="60" width="120" height="30" rx="3" fill="currentColor" opacity="0.2"/>
      {/* Wheels */}
      <circle cx="60" cy="110" r="15" fill="currentColor" opacity="0.2"/>
      <circle cx="140" cy="110" r="15" fill="currentColor" opacity="0.2"/>
      <circle cx="60" cy="110" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="140" cy="110" r="8" fill="currentColor" opacity="0.3"/>
      {/* Horses */}
      <ellipse cx="20" cy="70" rx="12" ry="8" fill="currentColor" opacity="0.15"/>
      <ellipse cx="180" cy="70" rx="12" ry="8" fill="currentColor" opacity="0.15"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Wells Fargo Banner - Same as main app */}
      <header className="wells-fargo-banner ps-masthead" role="banner">
        <div className="ps-masthead-wrapper">
          {/* Logo Section */}
          <div className="new_logoOuter">
            <div className="ps-logo-home">
              <Link to="/">
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
        </div>
      </header>

      {/* eSignature Studio Sub-Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-3">
              <FileSignature className="h-6 w-6" style={{ color: '#D71E2B' }} />
              <h1 className="text-xl font-semibold text-gray-900">eSignature Studio</h1>
            </div>
            <span className="hidden sm:inline text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-600 text-center sm:text-left">Professional Digital Signing Platform</span>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout with Illustration */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Illustration - Mobile/Tablet (shown above form) */}
          <div className="lg:hidden flex items-center justify-center p-4 mb-4">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 rounded-full blur-2xl opacity-50"></div>
              <div className="relative z-10 flex items-center justify-center">
                {!imageError ? (
                  <img 
                    src="/signing-illustration.png" 
                    alt="Digital signature illustration"
                    className="w-full h-auto object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl flex items-center justify-center p-8">
                    <div className="text-center">
                      <FileSignature className="h-20 w-20 mx-auto mb-4" style={{ color: '#D71E2B' }} />
                      <p className="text-sm text-gray-600">Add signing-illustration.png to the public folder</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Left Side - Login Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 order-2 lg:order-1">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">{getGreeting()}</h2>
            <p className="text-gray-600">Sign on to manage your accounts.</p>
          </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm bg-white"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Save Username Checkbox */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start">
                  <input
                    id="save-username"
                    name="save-username"
                    type="checkbox"
                    checked={saveUsername}
                    onChange={(e) => setSaveUsername(e.target.checked)}
                    className="h-4 w-4 mt-0.5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <label htmlFor="save-username" className="block text-sm font-medium text-gray-700 cursor-pointer">
                      Save username
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Notice - For your security, we do not recommend using this feature on a shared device.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <Shield className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Sign On Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                style={{ backgroundColor: '#D71E2B' }}
              >
                {loading ? 'Signing in...' : 'Sign On'}
              </button>
            </form>

            {/* Demo Accounts Section - Below Form */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4 text-center">Quick Access - Demo Accounts</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {demoAccounts.map((account, index) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => fillDemoAccount(account)}
                      className="text-left px-4 py-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 hover:border-red-300 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-white rounded border border-gray-200 group-hover:border-red-300 transition-colors">
                          <Icon className="h-4 w-4" style={{ color: '#D71E2B' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{account.role}</div>
                          <div className="text-xs text-gray-500 truncate">{account.email}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Signing Illustration (Desktop) */}
          <div className="hidden lg:flex items-center justify-center p-8 order-1 lg:order-2">
            <div className="relative w-full max-w-md">
              {/* Background gradient circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 rounded-full blur-3xl opacity-60"></div>
              
              {/* Illustration container */}
              <div className="relative z-10 flex items-center justify-center">
                {!imageError ? (
                  <img 
                    src="/signing-illustration.png" 
                    alt="Digital signature illustration"
                    className="w-full h-auto max-w-md object-contain drop-shadow-2xl"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl flex items-center justify-center p-8 shadow-lg">
                    <div className="text-center">
                      <FileSignature className="h-24 w-24 mx-auto mb-4" style={{ color: '#D71E2B' }} />
                      <p className="text-sm text-gray-600 font-medium mb-2">Signing Illustration</p>
                      <p className="text-xs text-gray-500">Add signing-illustration.png to the public folder</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-100 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
          {branding?.metadata?.footerText || '© 2024 Wells Fargo & Company. All rights reserved.'}
        </p>
      </div>
    </div>
  );
};

export default Login;
