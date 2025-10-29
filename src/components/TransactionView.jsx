import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  Calendar,
  Mail,
  FileText,
  Download,
  Share2,
  Edit3
} from 'lucide-react';

const TransactionView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockTransaction = {
      id: parseInt(id),
      title: 'Commercial Loan Agreement',
      description: 'Standard commercial loan agreement for ABC Corporation',
      status: 'pending',
      priority: 'high',
      createdDate: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-20T17:00:00Z',
      file: null, // In real app, this would be the actual file
      fields: [
        {
          id: 1,
          type: 'signature',
          x: 100,
          y: 200,
          page: 1,
          width: 200,
          height: 60,
          label: 'Borrower Signature',
          value: '',
          required: true
        },
        {
          id: 2,
          type: 'text',
          x: 100,
          y: 300,
          page: 1,
          width: 200,
          height: 40,
          label: 'Company Name',
          value: 'ABC Corporation',
          required: true
        },
        {
          id: 3,
          type: 'date',
          x: 100,
          y: 400,
          page: 1,
          width: 150,
          height: 40,
          label: 'Agreement Date',
          value: '2024-01-15',
          required: true
        }
      ],
      recipients: [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@abccorp.com',
          role: 'signer',
          order: 1,
          status: 'pending',
          signedDate: null
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@wellsfargo.com',
          role: 'approver',
          order: 2,
          status: 'pending',
          signedDate: null
        },
        {
          id: 3,
          name: 'Mike Wilson',
          email: 'mike.wilson@wellsfargo.com',
          role: 'reviewer',
          order: 3,
          status: 'completed',
          signedDate: '2024-01-16T14:30:00Z'
        }
      ],
      createdBy: {
        name: 'Admin User',
        email: 'admin@wellsfargo.com'
      }
    };

    setTimeout(() => {
      setTransaction(mockTransaction);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wells-fargo-red"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Transaction not found</h3>
        <p className="mt-1 text-sm text-gray-500">The transaction you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 wells-fargo-button"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="wells-fargo-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{transaction.title}</h1>
              <p className="text-gray-600 mt-1">{transaction.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
              {transaction.status.replace('-', ' ')}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(transaction.priority)}`}>
              {transaction.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Viewer */}
          <div className="wells-fargo-card">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Document</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-96">
              {transaction.file ? (
                <PDFViewer
                  file={transaction.file}
                  fields={transaction.fields}
                  onFieldAdd={() => {}}
                  onFieldUpdate={() => {}}
                  onFieldDelete={() => {}}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">PDF preview not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="wells-fargo-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-wells-fargo-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Transaction created by {transaction.createdBy.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.createdDate).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {transaction.recipients.map((recipient) => (
                <div key={recipient.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      recipient.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {recipient.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">
                          {recipient.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {recipient.status === 'completed' ? 'Signed by' : 'Sent to'} {recipient.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {recipient.signedDate 
                        ? new Date(recipient.signedDate).toLocaleString()
                        : 'Pending'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Transaction Details */}
          <div className="wells-fargo-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(transaction.createdDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Due Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(transaction.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fields</span>
                <span className="text-sm font-medium text-gray-900">
                  {transaction.fields.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recipients</span>
                <span className="text-sm font-medium text-gray-900">
                  {transaction.recipients.length}
                </span>
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="wells-fargo-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
            <div className="space-y-3">
              {transaction.recipients.map((recipient) => (
                <div key={recipient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {recipient.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                      <p className="text-xs text-gray-500">{recipient.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(recipient.status)}`}>
                      {recipient.status}
                    </span>
                    <p className="text-xs text-gray-500 capitalize mt-1">{recipient.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="wells-fargo-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full wells-fargo-button">
                Send Reminder
              </button>
              <button className="w-full wells-fargo-button-secondary">
                Edit Transaction
              </button>
              <button className="w-full wells-fargo-button-secondary">
                Download PDF
              </button>
              <button className="w-full text-red-600 hover:text-red-700 text-sm font-medium">
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionView;
