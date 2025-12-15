import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  FileSignature,
  PenTool,
  Zap,
  ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    pendingTransactions: 0,
    completedTransactions: 0,
    rejectedTransactions: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Mock data - in real app, this would come from an API
    setStats({
      totalTransactions: 24,
      pendingTransactions: 8,
      completedTransactions: 14,
      rejectedTransactions: 2
    });

    setRecentTransactions([
      {
        id: 1,
        title: 'Commercial Loan Agreement',
        status: 'pending',
        participants: 3,
        createdDate: '2024-01-15',
        dueDate: '2024-01-20',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Employment Contract - Sarah Johnson',
        status: 'completed',
        participants: 2,
        createdDate: '2024-01-14',
        dueDate: '2024-01-18',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Vendor Agreement - ABC Corp',
        status: 'in-progress',
        participants: 4,
        createdDate: '2024-01-13',
        dueDate: '2024-01-22',
        priority: 'low'
      },
      {
        id: 4,
        title: 'NDA - Confidential Project',
        status: 'rejected',
        participants: 2,
        createdDate: '2024-01-12',
        dueDate: '2024-01-16',
        priority: 'high'
      }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Header - Enhanced with eSigning visuals */}
      <div className="wells-fargo-card p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-400/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border-2 border-gray-200 shadow-lg">
                <FileSignature className="h-10 w-10" style={{ color: 'var(--theme-primary)' }} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1.5 flex items-center space-x-2">
                <PenTool className="h-4 w-4" />
                <span>Manage your digital signature transactions efficiently</span>
              </p>
            </div>
          </div>
          <Link
            to="/transaction/create"
            className="wells-fargo-button flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>New Transaction</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid - Enhanced with eSigning icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="wells-fargo-card p-6 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-full blur-2xl"></div>
          <div className="relative flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 group-hover:bg-red-100 transition-colors">
                <FileSignature className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Transactions
                </dt>
                <dd className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-full blur-2xl"></div>
          <div className="relative flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100 group-hover:bg-yellow-100 transition-colors">
                <PenTool className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Pending
                </dt>
                <dd className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.pendingTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-2xl"></div>
          <div className="relative flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100 group-hover:bg-green-100 transition-colors">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completed
                </dt>
                <dd className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.completedTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-full blur-2xl"></div>
          <div className="relative flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 group-hover:bg-red-100 transition-colors">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Rejected
                </dt>
                <dd className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.rejectedTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="wells-fargo-card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(transaction.status)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created {new Date(transaction.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {transaction.participants}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {new Date(transaction.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(transaction.priority)}`}>
                      {transaction.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/transaction/${transaction.id}`}
                      className="text-wells-fargo-red hover:text-wells-fargo-dark-red"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions - Enhanced with eSigning icons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="wells-fargo-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5" style={{ color: 'var(--theme-primary)' }} />
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <Link
                to="/transaction/create"
                className="flex items-center p-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-yellow-50 rounded-xl transition-all border border-gray-200 hover:border-red-200 hover:shadow-md group"
              >
                <div className="p-2.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors mr-3">
                  <FileSignature className="h-5 w-5 text-red-600" />
                </div>
                <span className="font-medium">Create New Transaction</span>
              </Link>
              <button className="flex items-center p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all border border-gray-200 hover:border-blue-200 hover:shadow-md group w-full text-left">
                <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors mr-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Upload Document Template</span>
              </button>
              <button className="flex items-center p-4 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-xl transition-all border border-gray-200 hover:border-green-200 hover:shadow-md group w-full text-left">
                <div className="p-2.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors mr-3">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Manage Recipients</span>
              </button>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-gray-900">12 transactions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-sm font-medium text-green-600">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Processing Time</span>
              <span className="text-sm font-medium text-gray-900">2.3 days</span>
            </div>
            <div className="pt-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+15% from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
