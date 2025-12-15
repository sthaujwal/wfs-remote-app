import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('wfs-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = [
      {
        id: 1,
        email: 'admin@wellsfargo.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        department: 'IT Administration',
        accounts: [
          { id: 'ACC-001', name: 'Corporate Banking Division', code: 'CBD-001' },
          { id: 'ACC-002', name: 'Enterprise IT Services', code: 'EIS-002' },
          { id: 'ACC-003', name: 'Executive Management', code: 'EM-003' }
        ]
      },
      {
        id: 2,
        email: 'user@wellsfargo.com',
        password: 'user123',
        name: 'John Smith',
        role: 'user',
        department: 'Commercial Banking',
        accounts: [
          { id: 'ACC-101', name: 'Commercial Lending - North Region', code: 'CL-NR-101' },
          { id: 'ACC-102', name: 'Small Business Banking', code: 'SBB-102' },
          { id: 'ACC-103', name: 'Regional Operations', code: 'RO-103' }
        ]
      },
      {
        id: 3,
        email: 'manager@wellsfargo.com',
        password: 'manager123',
        name: 'Sarah Johnson',
        role: 'user',
        department: 'Risk Management',
        accounts: [
          { id: 'ACC-201', name: 'Credit Risk Analysis', code: 'CRA-201' },
          { id: 'ACC-202', name: 'Compliance Monitoring', code: 'CM-202' }
        ]
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password
      setUser(userData);
      localStorage.setItem('wfs-user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wfs-user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
