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
  AlertCircle
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
      {/* Welcome Header */}
      <div className="wells-fargo-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your electronic signature transactions efficiently
            </p>
          </div>
          <Link
            to="/transaction/create"
            className="wells-fargo-button flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Transaction</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="wells-fargo-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-wells-fargo-red" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Transactions
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.totalTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Pending
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.pendingTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completed
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.completedTransactions}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="wells-fargo-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Rejected
                </dt>
                <dd className="text-lg font-medium text-gray-900">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="wells-fargo-card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/transaction/create"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Plus className="h-5 w-5 text-wells-fargo-red mr-3" />
              Create New Transaction
            </Link>
            <button className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors w-full text-left">
              <FileText className="h-5 w-5 text-wells-fargo-red mr-3" />
              Upload Document Template
            </button>
            <button className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors w-full text-left">
              <Users className="h-5 w-5 text-wells-fargo-red mr-3" />
              Manage Recipients
            </button>
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
