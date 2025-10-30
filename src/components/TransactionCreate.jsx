import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import FieldPalette from './FieldPalette';
import RecipientSearch from './RecipientSearch';
import { 
  Upload, 
  Users, 
  FileText, 
  Send,
  X,
  Plus,
  Mail,
  User,
  Building2,
  Search,
  Trash2,
  Hash,
  Database,
  Tag
} from 'lucide-react';

const TransactionCreate = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fields, setFields] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [transactionData, setTransactionData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    emailTemplate: 'default',
    accountIds: '',
    systemOfRecord: '',
    customAttributes: []
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file. Selected file type: ' + file.type);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file. Selected file type: ' + file.type);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFieldAdd = (field) => {
    setFields([...fields, field]);
  };

  const handleFieldUpdate = (fieldId, updatedField) => {
    setFields(fields.map(field => 
      field.id === fieldId ? updatedField : field
    ));
  };

  const handleFieldDelete = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const addRecipient = () => {
    const newRecipient = {
      id: Date.now(),
      name: '',
      email: '',
      uniqueId: '',
      type: 'team-member', // 'team-member' or 'customer'
      role: 'signer',
      order: recipients.length + 1,
      showSearch: true // Show search initially
    };
    setRecipients([...recipients, newRecipient]);
  };

  const updateRecipient = (id, updates) => {
    setRecipients(recipients.map(recipient =>
      recipient.id === id ? { ...recipient, ...updates } : recipient
    ));
  };

  const removeRecipient = (id) => {
    setRecipients(recipients.filter(recipient => recipient.id !== id));
  };

  const handleRecipientSearchSelect = (id, recipientData) => {
    updateRecipient(id, {
      ...recipientData,
      role: 'signer', // Default role
      showSearch: false // Hide search after selection
    });
  };

  const toggleRecipientSearch = (id) => {
    const recipient = recipients.find(r => r.id === id);
    updateRecipient(id, { 
      showSearch: true,
      // Keep existing data so user can add more recipients
      name: recipient?.name || '',
      email: recipient?.email || '',
      uniqueId: recipient?.uniqueId || ''
    });
  };

  const handleSubmit = () => {
    // In a real app, this would save to backend
    const transaction = {
      id: Date.now(),
      ...transactionData,
      file: uploadedFile,
      fields,
      recipients,
      status: 'pending',
      createdDate: new Date().toISOString()
    };
    
    console.log('Creating transaction:', transaction);
    alert('Transaction created successfully!');
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: 'Transaction Details', completed: step > 1 },
    { number: 2, title: 'Add Recipients', completed: step > 2 },
    { number: 3, title: 'Upload Document', completed: step > 3 },
    { number: 4, title: 'Add Fields', completed: step > 4 },
    { number: 5, title: 'Review & Send', completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="wells-fargo-card p-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Transaction</h1>
        <p className="text-gray-600 mt-1">Set up a new electronic signature transaction</p>
      </div>

      {/* Progress Steps */}
      <div className="wells-fargo-card p-6">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.number} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                stepItem.completed 
                  ? 'bg-wells-fargo-red border-wells-fargo-red text-white' 
                  : step === stepItem.number
                  ? 'border-wells-fargo-red text-wells-fargo-red'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {stepItem.completed ? '✓' : stepItem.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step >= stepItem.number ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {stepItem.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  stepItem.completed ? 'bg-wells-fargo-red' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Transaction Details */}
      {step === 1 && (
        <div className="wells-fargo-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Title *
              </label>
              <input
                type="text"
                value={transactionData.title}
                onChange={(e) => setTransactionData({...transactionData, title: e.target.value})}
                className="form-field w-full"
                placeholder="Enter transaction title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={transactionData.dueDate}
                onChange={(e) => setTransactionData({...transactionData, dueDate: e.target.value})}
                className="form-field w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={transactionData.priority}
                onChange={(e) => setTransactionData({...transactionData, priority: e.target.value})}
                className="form-field w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Template
              </label>
              <select
                value={transactionData.emailTemplate}
                onChange={(e) => setTransactionData({...transactionData, emailTemplate: e.target.value})}
                className="form-field w-full"
              >
                <option value="default">Default Template</option>
                <option value="formal">Formal Template</option>
                <option value="friendly">Friendly Template</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={transactionData.description}
                onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
                className="form-field w-full"
                rows={3}
                placeholder="Enter transaction description"
              />
            </div>
            
            {/* Account IDs */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span>Account IDs</span>
                </div>
              </label>
              <input
                type="text"
                value={transactionData.accountIds}
                onChange={(e) => setTransactionData({...transactionData, accountIds: e.target.value})}
                className="form-field w-full"
                placeholder="Enter account IDs (comma-separated, e.g., ACC-12345, ACC-67890)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple account IDs with commas</p>
            </div>

            {/* System Of Record */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <span>System Of Record</span>
                </div>
              </label>
              <input
                type="text"
                value={transactionData.systemOfRecord}
                onChange={(e) => setTransactionData({...transactionData, systemOfRecord: e.target.value})}
                className="form-field w-full"
                placeholder="Enter system of record (e.g., SAP, Oracle, Salesforce)"
              />
            </div>

            {/* Custom Attributes */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span>Custom Attributes</span>
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTransactionData({
                      ...transactionData,
                      customAttributes: [...transactionData.customAttributes, { id: Date.now(), key: '', value: '' }]
                    });
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-wells-fargo-red hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Attribute</span>
                </button>
              </div>
              
              {transactionData.customAttributes.length === 0 ? (
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">No custom attributes added</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Add Attribute" to create custom key-value pairs</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {transactionData.customAttributes.map((attr) => (
                    <div key={attr.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="text"
                        value={attr.key}
                        onChange={(e) => {
                          const updated = transactionData.customAttributes.map(a =>
                            a.id === attr.id ? { ...a, key: e.target.value } : a
                          );
                          setTransactionData({ ...transactionData, customAttributes: updated });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wells-fargo-red focus:border-transparent text-sm"
                        placeholder="Attribute key"
                      />
                      <span className="text-gray-400">:</span>
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => {
                          const updated = transactionData.customAttributes.map(a =>
                            a.id === attr.id ? { ...a, value: e.target.value } : a
                          );
                          setTransactionData({ ...transactionData, customAttributes: updated });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wells-fargo-red focus:border-transparent text-sm"
                        placeholder="Attribute value"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const filtered = transactionData.customAttributes.filter(a => a.id !== attr.id);
                          setTransactionData({ ...transactionData, customAttributes: filtered });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove attribute"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="wells-fargo-button"
              disabled={!transactionData.title || !transactionData.dueDate}
            >
              Continue to Recipients
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Add Recipients */}
      {step === 2 && (
        <div className="wells-fargo-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Add Recipients</h2>
            <button
              onClick={addRecipient}
              className="wells-fargo-button-secondary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Recipient</span>
            </button>
          </div>

          {/* Selected Recipients Summary */}
          {recipients.filter(r => r.name).length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Selected Recipients ({recipients.filter(r => r.name).length})</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipients.filter(r => r.name).map((rec) => (
                  <div
                    key={rec.id}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
                      (rec.type || 'team-member') === 'team-member'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {(rec.type || 'team-member') === 'team-member' ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Building2 className="h-3 w-3" />
                    )}
                    <span>{rec.name}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 capitalize">{rec.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {recipients.map((recipient) => (
              <div key={recipient.id} className="border-2 border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                {/* Modern Header with Card-based Selection */}
                <div className="flex items-center justify-between mb-6">
                  {!recipient.name ? (
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Select Recipient Type</p>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Team Member Card */}
                        <button
                          type="button"
                          onClick={() => updateRecipient(recipient.id, { 
                            type: 'team-member',
                            name: '',
                            email: '',
                            uniqueId: '',
                            showSearch: true
                          })}
                          className={`group relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            (recipient.type || 'team-member') === 'team-member'
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md shadow-blue-500/20'
                              : 'border-gray-200 bg-gray-50/50 hover:border-blue-300 hover:bg-blue-50/30'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-3 rounded-lg ${
                              (recipient.type || 'team-member') === 'team-member'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-600 group-hover:bg-blue-400'
                            } transition-colors`}>
                              <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${
                                (recipient.type || 'team-member') === 'team-member' ? 'text-blue-900' : 'text-gray-700'
                              }`}>
                                Team Member
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">Search Active Directory</p>
                            </div>
                          </div>
                          {(recipient.type || 'team-member') === 'team-member' && (
                            <div className="absolute top-2 right-2">
                              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </button>
                        
                        {/* Customer Card */}
                        <button
                          type="button"
                          onClick={() => updateRecipient(recipient.id, { 
                            type: 'customer',
                            name: '',
                            email: '',
                            uniqueId: '',
                            showSearch: true
                          })}
                          className={`group relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            recipient.type === 'customer'
                              ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-md shadow-emerald-500/20'
                              : 'border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-emerald-50/30'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-3 rounded-lg ${
                              recipient.type === 'customer'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-300 text-gray-600 group-hover:bg-emerald-400'
                            } transition-colors`}>
                              <Building2 className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${
                                recipient.type === 'customer' ? 'text-emerald-900' : 'text-gray-700'
                              }`}>
                                Customer
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">Search Customer Repository</p>
                            </div>
                          </div>
                          {recipient.type === 'customer' && (
                            <div className="absolute top-2 right-2">
                              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`p-2.5 rounded-xl ${
                        (recipient.type || 'team-member') === 'team-member'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                          : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                      }`}>
                        {(recipient.type || 'team-member') === 'team-member' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Building2 className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.email}</p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => removeRecipient(recipient.id)}
                    className="flex-shrink-0 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Remove recipient"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Search Section */}
                {recipient.showSearch ? (
                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                      <RecipientSearch
                        recipientType={recipient.type || 'team-member'}
                        onSelect={(data) => handleRecipientSearchSelect(recipient.id, data)}
                        onCancel={() => updateRecipient(recipient.id, { showSearch: false })}
                      />
                    </div>
                  </div>
                ) : recipient.name ? (
                  <div className="space-y-3">
                    {/* Compact Selected Recipient Display */}
                    <div className={`p-3 rounded-xl border ${
                      (recipient.type || 'team-member') === 'team-member'
                        ? 'border-blue-200 bg-blue-50/30'
                        : 'border-emerald-200 bg-emerald-50/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            (recipient.type || 'team-member') === 'team-member'
                              ? 'bg-blue-500 text-white'
                              : 'bg-emerald-500 text-white'
                          }`}>
                            {(recipient.type || 'team-member') === 'team-member' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Building2 className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{recipient.name}</p>
                            <p className="text-xs text-gray-500 truncate">{recipient.email}</p>
                          </div>
                        </div>
                        <select
                          value={recipient.role}
                          onChange={(e) => updateRecipient(recipient.id, { role: e.target.value })}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-wells-fargo-red/20 focus:border-wells-fargo-red"
                        >
                          <option value="signer">Signer</option>
                          <option value="reviewer">Reviewer</option>
                          <option value="approver">Approver</option>
                        </select>
                        <button
                          onClick={() => toggleRecipientSearch(recipient.id)}
                          className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Change recipient"
                        >
                          <Search className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    Select recipient type above to start searching
                  </div>
                )}
              </div>
            ))}
            
            {/* Always show Add Another button at the bottom */}
            <button
              onClick={addRecipient}
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">
                  Add Another Recipient
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">You can choose Team Member or Customer</p>
            </button>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="wells-fargo-button-secondary"
            >
              Back to Transaction Details
            </button>
            <button
              onClick={() => setStep(3)}
              className="wells-fargo-button"
              disabled={recipients.length === 0}
            >
              Continue to Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Upload Document */}
      {step === 3 && (
        <div className="wells-fargo-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h2>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-wells-fargo-red transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <FileText className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}
                  className="wells-fargo-button-secondary text-sm"
                >
                  Change File
                </button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <button
                    type="button"
                    className="wells-fargo-button"
                  >
                    Choose PDF File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  or drag and drop a PDF file here
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supported format: PDF files only
                </p>
              </>
            )}
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="wells-fargo-button-secondary"
            >
              Back to Recipients
            </button>
            <button
              onClick={() => setStep(4)}
              className="wells-fargo-button"
              disabled={!uploadedFile}
            >
              Continue to Add Fields
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Add Fields */}
      {step === 4 && (
        <div className="wells-fargo-card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Add Form Fields</h2>
              <button
                onClick={() => setStep(5)}
                className="wells-fargo-button"
              >
                Continue to Review
              </button>
            </div>
          </div>
          <div className="flex h-96">
            <FieldPalette />
            <div className="flex-1">
              <PDFViewer
                file={uploadedFile}
                fields={fields}
                onFieldAdd={handleFieldAdd}
                onFieldUpdate={handleFieldUpdate}
                onFieldDelete={handleFieldDelete}
                recipients={recipients}
              />
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={() => setStep(3)}
              className="wells-fargo-button-secondary"
            >
              Back to Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Review & Send */}
      {step === 5 && (
        <div className="space-y-6">
          {/* Transaction Details Summary */}
          <div className="wells-fargo-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Transaction Title
                </label>
                <p className="text-gray-900 font-medium">{transactionData.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Due Date
                </label>
                <p className="text-gray-900 font-medium">{transactionData.dueDate || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Priority
                </label>
                <p className="text-gray-900 font-medium capitalize">{transactionData.priority}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Template
                </label>
                <p className="text-gray-900 font-medium capitalize">{transactionData.emailTemplate}</p>
              </div>
              {transactionData.description && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Description
                  </label>
                  <p className="text-gray-900">{transactionData.description}</p>
                </div>
              )}
              {transactionData.accountIds && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4" />
                      <span>Account IDs</span>
                    </div>
                  </label>
                  <p className="text-gray-900 font-medium">{transactionData.accountIds}</p>
                </div>
              )}
              {transactionData.systemOfRecord && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <span>System Of Record</span>
                    </div>
                  </label>
                  <p className="text-gray-900 font-medium">{transactionData.systemOfRecord}</p>
                </div>
              )}
              {transactionData.customAttributes && transactionData.customAttributes.length > 0 && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4" />
                      <span>Custom Attributes</span>
                    </div>
                  </label>
                  <div className="space-y-2">
                    {transactionData.customAttributes.map((attr) => (
                      <div key={attr.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-semibold text-gray-700 min-w-[120px]">{attr.key || '(empty key)'}</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-sm text-gray-900 flex-1">{attr.value || '(empty value)'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="wells-fargo-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">File:</span>
                  <span className="font-medium">{uploadedFile?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fields Added:</span>
                  <span className="font-medium">{fields.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">{recipients.length}</span>
                </div>
              </div>
            </div>

            <div className="wells-fargo-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
              <div className="space-y-3">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3 flex-1">
                      {recipient.type === 'team-member' ? (
                        <User className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Building2 className="h-4 w-4 text-green-600" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{recipient.name || 'No name'}</span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded capitalize">
                            {recipient.type === 'team-member' ? 'Team' : 'Customer'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{recipient.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{recipient.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="wells-fargo-card p-6">
            <div className="flex justify-between">
              <button
                onClick={() => setStep(4)}
                className="wells-fargo-button-secondary"
              >
                Back to Fields
              </button>
              <button
                onClick={handleSubmit}
                className="wells-fargo-button flex items-center space-x-2"
                disabled={!transactionData.title || !transactionData.dueDate}
              >
                <Send className="h-4 w-4" />
                <span>Create Transaction</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCreate;
