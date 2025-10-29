import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Building2, X } from 'lucide-react';

// Mock API functions - In production, these would call actual APIs
const searchActiveDirectory = async (query) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - In production, this would query Active Directory
  const mockTeamMembers = [
    { uniqueId: 'AD001', email: 'john.doe@wellsfargo.com', name: 'John Doe', department: 'Legal', title: 'Senior Legal Counsel', role: 'signer' },
    { uniqueId: 'AD002', email: 'jane.smith@wellsfargo.com', name: 'Jane Smith', department: 'Operations', title: 'Operations Manager', role: 'signer' },
    { uniqueId: 'AD003', email: 'mike.johnson@wellsfargo.com', name: 'Mike Johnson', department: 'Finance', title: 'Finance Director', role: 'signer' },
    { uniqueId: 'AD004', email: 'sarah.williams@wellsfargo.com', name: 'Sarah Williams', department: 'Compliance', title: 'Compliance Officer', role: 'signer' },
    { uniqueId: 'AD005', email: 'david.brown@wellsfargo.com', name: 'David Brown', department: 'IT', title: 'IT Manager', role: 'signer' },
    { uniqueId: 'AD006', email: 'emily.chen@wellsfargo.com', name: 'Emily Chen', department: 'Risk Management', title: 'Risk Analyst', role: 'signer' },
    { uniqueId: 'AD007', email: 'robert.taylor@wellsfargo.com', name: 'Robert Taylor', department: 'Audit', title: 'Senior Auditor', role: 'signer' },
    { uniqueId: 'AD008', email: 'lisa.anderson@wellsfargo.com', name: 'Lisa Anderson', department: 'Commercial Banking', title: 'Relationship Manager', role: 'signer' },
    { uniqueId: 'AD009', email: 'james.wilson@wellsfargo.com', name: 'James Wilson', department: 'Compliance', title: 'Compliance Director', role: 'signer' },
    { uniqueId: 'AD010', email: 'patricia.martinez@wellsfargo.com', name: 'Patricia Martinez', department: 'Legal', title: 'Legal Counsel', role: 'signer' },
  ];

  // Filter by email or unique ID
  return mockTeamMembers.filter(member => 
    member.email.toLowerCase().includes(query.toLowerCase()) ||
    member.uniqueId.toLowerCase().includes(query.toLowerCase()) ||
    member.name.toLowerCase().includes(query.toLowerCase())
  );
};

const searchCustomerRepository = async (query) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - In production, this would query customer repository
  const mockCustomers = [
    { uniqueId: 'CUST001', email: 'contracts@acmecorp.com', name: 'Acme Corporation', accountNumber: 'ACC-12345', type: 'Business', role: 'signer' },
    { uniqueId: 'CUST002', email: 'legal@techsolutions.com', name: 'Tech Solutions Inc', accountNumber: 'ACC-67890', type: 'Business', role: 'signer' },
    { uniqueId: 'CUST003', email: 'john.public@example.com', name: 'John Public', accountNumber: 'ACC-11111', type: 'Individual', role: 'signer' },
    { uniqueId: 'CUST004', email: 'maria.garcia@example.com', name: 'Maria Garcia', accountNumber: 'ACC-22222', type: 'Individual', role: 'signer' },
    { uniqueId: 'CUST005', email: 'compliance@bigcorp.com', name: 'Big Corp Enterprise', accountNumber: 'ACC-33333', type: 'Enterprise', role: 'signer' },
    { uniqueId: 'CUST006', email: 'admin@globalltd.com', name: 'Global Industries Ltd', accountNumber: 'ACC-44444', type: 'Business', role: 'signer' },
    { uniqueId: 'CUST007', email: 'contact@startupco.io', name: 'StartupCo Innovation', accountNumber: 'ACC-55555', type: 'Business', role: 'signer' },
    { uniqueId: 'CUST008', email: 'robert.smith@email.com', name: 'Robert Smith', accountNumber: 'ACC-66666', type: 'Individual', role: 'signer' },
    { uniqueId: 'CUST009', email: 'legal@megaenterprise.com', name: 'Mega Enterprise Group', accountNumber: 'ACC-77777', type: 'Enterprise', role: 'signer' },
    { uniqueId: 'CUST010', email: 'sarah.jones@personal.com', name: 'Sarah Jones', accountNumber: 'ACC-88888', type: 'Individual', role: 'signer' },
  ];

  // Filter by email or unique ID
  return mockCustomers.filter(customer => 
    customer.email.toLowerCase().includes(query.toLowerCase()) ||
    customer.uniqueId.toLowerCase().includes(query.toLowerCase()) ||
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.accountNumber.toLowerCase().includes(query.toLowerCase())
  );
};

const RecipientSearch = ({ recipientType, onSelect, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Focus search input when component mounts
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        let searchResults = [];
        
        if (recipientType === 'team-member') {
          searchResults = await searchActiveDirectory(searchQuery);
        } else if (recipientType === 'customer') {
          searchResults = await searchCustomerRepository(searchQuery);
        }
        
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, recipientType]);

  const handleSelect = (result) => {
    const recipientData = {
      name: result.name,
      email: result.email,
      uniqueId: result.uniqueId,
      type: recipientType,
      ...(recipientType === 'team-member' && {
        department: result.department,
        title: result.title
      }),
      ...(recipientType === 'customer' && {
        accountNumber: result.accountNumber,
        customerType: result.type
      })
    };
    onSelect(recipientData);
    setSearchQuery('');
    setResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full">
      <div className="relative group">
        {/* Modern Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
          <div className={`p-2.5 rounded-xl ${
            recipientType === 'team-member' 
              ? 'bg-blue-500/10 group-focus-within:bg-blue-500/20' 
              : 'bg-emerald-500/10 group-focus-within:bg-emerald-500/20'
          } transition-all duration-300`}>
            <Search className={`h-5 w-5 ${
              recipientType === 'team-member' 
                ? 'text-blue-600' 
                : 'text-emerald-600'
            }`} />
          </div>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full pl-14 pr-12 py-3.5 text-base border rounded-xl bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 placeholder-gray-400 ${
            recipientType === 'team-member'
              ? 'border-blue-200/50 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-blue-500/20 focus:shadow-lg focus:shadow-blue-500/10'
              : 'border-emerald-200/50 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10'
          }`}
          placeholder={
            recipientType === 'team-member'
              ? 'Type to search team members by email, ID, or name...'
              : 'Type to search customers by email, ID, or name...'
          }
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className={`p-1 rounded-lg ${
              recipientType === 'team-member' ? 'bg-blue-50' : 'bg-emerald-50'
            }`}>
              <svg className={`animate-spin h-4 w-4 ${
                recipientType === 'team-member' ? 'text-blue-500' : 'text-emerald-500'
              }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        )}
        {!loading && searchQuery.length > 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedIndex(-1);
              setResults([]);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 transition-all"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div 
          ref={resultsRef}
          className={`absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border max-h-96 overflow-y-auto backdrop-blur-xl ${
            recipientType === 'team-member'
              ? 'border-blue-200/50 shadow-blue-500/10'
              : 'border-emerald-200/50 shadow-emerald-500/10'
          }`}
        >
          {results.map((result, index) => (
            <div
              key={result.uniqueId}
              onClick={() => handleSelect(result)}
              className={`p-4 cursor-pointer border-b border-gray-100/50 last:border-b-0 transition-all ${
                recipientType === 'team-member'
                  ? `hover:bg-blue-50/50 ${index === selectedIndex ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`
                  : `hover:bg-emerald-50/50 ${index === selectedIndex ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''}`
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-xl ${
                  recipientType === 'team-member' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                }`}>
                  {recipientType === 'team-member' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Building2 className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {result.name}
                    </p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      recipientType === 'team-member'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {result.uniqueId}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    {result.email}
                  </p>
                  {recipientType === 'team-member' && result.department && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {result.department}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{result.title}</span>
                    </div>
                  )}
                  {recipientType === 'customer' && result.accountNumber && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {result.accountNumber}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{result.type}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery.length >= 2 && !loading && results.length === 0 && (
        <div className={`absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border p-6 text-center ${
          recipientType === 'team-member'
            ? 'border-blue-200/50'
            : 'border-emerald-200/50'
        }`}>
          <p className={`text-sm font-semibold ${
            recipientType === 'team-member' ? 'text-blue-600' : 'text-emerald-600'
          }`}>
            No {recipientType === 'team-member' ? 'team members' : 'customers'} found
          </p>
          <p className="text-xs text-gray-500 mt-1.5">
            Try searching with a different email, ID, or name
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipientSearch;

