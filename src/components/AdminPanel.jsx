import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Mail, 
  Bell, 
  Users, 
  Shield, 
  FileText,
  Save,
  Plus,
  X,
  Edit3,
  Palette,
  Type,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBranding } from '../contexts/BrandingContext';
import { saveBrandingForAccount } from '../services/brandingService';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const { user } = useAuth();
  const { branding, loadBranding } = useBranding();
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: 'Default Signature Request',
      subject: 'Signature Required: {{transactionTitle}}',
      body: 'Dear {{recipientName}},\n\nYou have been requested to sign the document "{{transactionTitle}}".\n\nPlease click the link below to review and sign the document:\n{{signatureLink}}\n\nThis document is due by {{dueDate}}.\n\nThank you,\nWells Fargo Signature Team'
    },
    {
      id: 2,
      name: 'Reminder Email',
      subject: 'Reminder: Signature Required - {{transactionTitle}}',
      body: 'Dear {{recipientName}},\n\nThis is a reminder that you have a pending signature request for "{{transactionTitle}}".\n\nPlease complete your signature by {{dueDate}}.\n\n{{signatureLink}}\n\nThank you,\nWells Fargo Signature Team'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reminderFrequency: 'daily',
    escalationEnabled: true,
    escalationDays: 3
  });

  const [accountSettings, setAccountSettings] = useState({
    companyName: 'Wells Fargo & Company',
    defaultDueDays: 7,
    requireAuthentication: true,
    allowDelegation: false,
    autoArchive: true,
    retentionDays: 2555 // 7 years
  });

  const [userRoles, setUserRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['all'], description: 'Full system access' },
    { id: 2, name: 'Manager', permissions: ['create', 'view', 'manage'], description: 'Can create and manage transactions' },
    { id: 3, name: 'User', permissions: ['create', 'view'], description: 'Can create and view own transactions' },
    { id: 4, name: 'Reviewer', permissions: ['view'], description: 'Read-only access' }
  ]);

  const tabs = [
    { id: 'settings', name: 'Account Settings', icon: Settings },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'templates', name: 'Email Templates', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  // Branding form state
  const [brandingForm, setBrandingForm] = useState(null);
  const [savingBranding, setSavingBranding] = useState(false);
  const [brandingSaveMessage, setBrandingSaveMessage] = useState('');

  // Initialize branding form with current branding
  useEffect(() => {
    if (branding && activeTab === 'branding') {
      setBrandingForm({
        id: branding.id || '',
        name: branding.name || '',
        colors: {
          primary: branding.colors?.primary || '#D71E2B',
          secondary: branding.colors?.secondary || '#FFB81C',
          primaryDark: branding.colors?.primaryDark || '#A01A23',
          primaryHover: branding.colors?.primaryHover || '#B81E2A',
          background: branding.colors?.background || '#f8fafc',
          backgroundGradient: branding.colors?.backgroundGradient || 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          surface: branding.colors?.surface || '#FFFFFF',
          textPrimary: branding.colors?.textPrimary || '#1f2937',
          textSecondary: branding.colors?.textSecondary || '#6b7280',
          border: branding.colors?.border || '#e5e7eb',
          success: branding.colors?.success || '#059669',
          warning: branding.colors?.warning || '#D97706',
          error: branding.colors?.error || '#DC2626',
          info: branding.colors?.info || '#2563EB',
        },
        fonts: {
          primary: branding.fonts?.primary || '',
          body: branding.fonts?.body || '',
          googleFontsUrl: branding.fonts?.googleFontsUrl || '',
        },
        logos: {
          main: branding.logos?.main || '',
          favicon: branding.logos?.favicon || '',
          loginLogo: branding.logos?.loginLogo || '',
          sidebarLogo: branding.logos?.sidebarLogo || '',
        },
        components: {
          button: {
            borderRadius: branding.components?.button?.borderRadius || '0.75rem',
            shadow: branding.components?.button?.shadow || '',
            gradient: branding.components?.button?.gradient || '',
          },
          card: {
            borderRadius: branding.components?.card?.borderRadius || '1rem',
            shadow: branding.components?.card?.shadow || '',
          },
          input: {
            borderRadius: branding.components?.input?.borderRadius || '0.5rem',
            focusRing: branding.components?.input?.focusRing || '',
          },
        },
        metadata: {
          appName: branding.metadata?.appName || '',
          footerText: branding.metadata?.footerText || '',
          loginTitle: branding.metadata?.loginTitle || '',
        },
      });
    }
  }, [branding, activeTab]);

  const handleEmailTemplateUpdate = (id, updates) => {
    setEmailTemplates(templates => 
      templates.map(template => 
        template.id === id ? { ...template, ...updates } : template
      )
    );
  };

  const addEmailTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: 'New Template',
      subject: '',
      body: ''
    };
    setEmailTemplates([...emailTemplates, newTemplate]);
  };

  const removeEmailTemplate = (id) => {
    setEmailTemplates(templates => templates.filter(t => t.id !== id));
  };

  const saveSettings = () => {
    // In real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const handleBrandingChange = (path, value) => {
    if (!brandingForm) return;
    
    const keys = path.split('.');
    const newForm = { ...brandingForm };
    let current = newForm;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setBrandingForm(newForm);
  };

  const saveBranding = async () => {
    if (!brandingForm || !user?.accounts || user.accounts.length === 0) {
      alert('No account selected or branding form not initialized');
      return;
    }

    setSavingBranding(true);
    setBrandingSaveMessage('');

    try {
      // Get the currently selected account (you might want to add account selection in the form)
      const selectedAccount = user.accounts[0]; // For now, use first account
      
      const savedBranding = await saveBrandingForAccount(selectedAccount, brandingForm);
      
      // Reload branding to apply changes
      await loadBranding(selectedAccount);
      
      setBrandingSaveMessage('Branding saved successfully! Changes are now live.');
      setTimeout(() => setBrandingSaveMessage(''), 5000);
    } catch (error) {
      setBrandingSaveMessage(`Error saving branding: ${error.message}`);
      setTimeout(() => setBrandingSaveMessage(''), 5000);
    } finally {
      setSavingBranding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="wells-fargo-card p-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage system settings, templates, and user permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="wells-fargo-card p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    style={activeTab === tab.id ? { backgroundColor: 'var(--theme-primary)' } : {}}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Branding Management */}
          {activeTab === 'branding' && brandingForm && (
            <div className="space-y-6">
              <div className="wells-fargo-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Branding Configuration</h2>
                    <p className="text-sm text-gray-500 mt-1">Customize your application's appearance and branding</p>
                  </div>
                  {brandingSaveMessage && (
                    <div className={`px-4 py-2 rounded-md text-sm ${
                      brandingSaveMessage.includes('Error') 
                        ? 'bg-red-50 text-red-800' 
                        : 'bg-green-50 text-green-800'
                    }`}>
                      {brandingSaveMessage}
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Branding Name
                        </label>
                        <input
                          type="text"
                          value={brandingForm.name}
                          onChange={(e) => handleBrandingChange('name', e.target.value)}
                          className="form-field w-full"
                          placeholder="e.g., Wells Fargo Core"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          App Name
                        </label>
                        <input
                          type="text"
                          value={brandingForm.metadata.appName}
                          onChange={(e) => handleBrandingChange('metadata.appName', e.target.value)}
                          className="form-field w-full"
                          placeholder="Application name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Login Title
                        </label>
                        <input
                          type="text"
                          value={brandingForm.metadata.loginTitle}
                          onChange={(e) => handleBrandingChange('metadata.loginTitle', e.target.value)}
                          className="form-field w-full"
                          placeholder="Login page title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Footer Text
                        </label>
                        <input
                          type="text"
                          value={brandingForm.metadata.footerText}
                          onChange={(e) => handleBrandingChange('metadata.footerText', e.target.value)}
                          className="form-field w-full"
                          placeholder="Copyright text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <Palette className="h-5 w-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                      Colors
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(brandingForm.colors).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={value.startsWith('#') ? value : '#000000'}
                              onChange={(e) => handleBrandingChange(`colors.${key}`, e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                              disabled={key === 'backgroundGradient'}
                            />
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleBrandingChange(`colors.${key}`, e.target.value)}
                              className="form-field flex-1"
                              placeholder={key === 'backgroundGradient' ? 'CSS gradient' : '#hexcolor'}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <Type className="h-5 w-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                      Typography
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Font (Headings)
                        </label>
                        <input
                          type="text"
                          value={brandingForm.fonts.primary}
                          onChange={(e) => handleBrandingChange('fonts.primary', e.target.value)}
                          className="form-field w-full"
                          placeholder="e.g., 'Playfair Display', serif"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Body Font
                        </label>
                        <input
                          type="text"
                          value={brandingForm.fonts.body}
                          onChange={(e) => handleBrandingChange('fonts.body', e.target.value)}
                          className="form-field w-full"
                          placeholder="e.g., 'Inter', sans-serif"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Google Fonts URL
                        </label>
                        <input
                          type="text"
                          value={brandingForm.fonts.googleFontsUrl}
                          onChange={(e) => handleBrandingChange('fonts.googleFontsUrl', e.target.value)}
                          className="form-field w-full"
                          placeholder="https://fonts.googleapis.com/css2?family=..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Logos */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                      Logos & Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Main Logo URL
                        </label>
                        <input
                          type="text"
                          value={brandingForm.logos.main}
                          onChange={(e) => handleBrandingChange('logos.main', e.target.value)}
                          className="form-field w-full"
                          placeholder="/logos/main.svg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Favicon URL
                        </label>
                        <input
                          type="text"
                          value={brandingForm.logos.favicon}
                          onChange={(e) => handleBrandingChange('logos.favicon', e.target.value)}
                          className="form-field w-full"
                          placeholder="/favicons/favicon.ico"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Login Logo URL
                        </label>
                        <input
                          type="text"
                          value={brandingForm.logos.loginLogo}
                          onChange={(e) => handleBrandingChange('logos.loginLogo', e.target.value)}
                          className="form-field w-full"
                          placeholder="/logos/login.svg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sidebar Logo URL
                        </label>
                        <input
                          type="text"
                          value={brandingForm.logos.sidebarLogo}
                          onChange={(e) => handleBrandingChange('logos.sidebarLogo', e.target.value)}
                          className="form-field w-full"
                          placeholder="/logos/sidebar.svg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Component Styles */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                      Component Styles
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Button Styles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Border Radius
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.button.borderRadius}
                              onChange={(e) => handleBrandingChange('components.button.borderRadius', e.target.value)}
                              className="form-field w-full"
                              placeholder="0.75rem"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Shadow
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.button.shadow}
                              onChange={(e) => handleBrandingChange('components.button.shadow', e.target.value)}
                              className="form-field w-full"
                              placeholder="0 4px 12px rgba(...)"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Gradient
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.button.gradient}
                              onChange={(e) => handleBrandingChange('components.button.gradient', e.target.value)}
                              className="form-field w-full"
                              placeholder="linear-gradient(...)"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Card Styles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Border Radius
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.card.borderRadius}
                              onChange={(e) => handleBrandingChange('components.card.borderRadius', e.target.value)}
                              className="form-field w-full"
                              placeholder="1rem"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Shadow
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.card.shadow}
                              onChange={(e) => handleBrandingChange('components.card.shadow', e.target.value)}
                              className="form-field w-full"
                              placeholder="0 4px 6px rgba(...)"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Input Styles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Border Radius
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.input.borderRadius}
                              onChange={(e) => handleBrandingChange('components.input.borderRadius', e.target.value)}
                              className="form-field w-full"
                              placeholder="0.5rem"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Focus Ring Color
                            </label>
                            <input
                              type="text"
                              value={brandingForm.components.input.focusRing}
                              onChange={(e) => handleBrandingChange('components.input.focusRing', e.target.value)}
                              className="form-field w-full"
                              placeholder="rgba(215, 30, 43, 0.1)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={saveBranding}
                      disabled={savingBranding}
                      className="wells-fargo-button flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{savingBranding ? 'Saving...' : 'Save Branding'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'settings' && (
            <div className="wells-fargo-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={accountSettings.companyName}
                      onChange={(e) => setAccountSettings({...accountSettings, companyName: e.target.value})}
                      className="form-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Due Days
                    </label>
                    <input
                      type="number"
                      value={accountSettings.defaultDueDays}
                      onChange={(e) => setAccountSettings({...accountSettings, defaultDueDays: parseInt(e.target.value)})}
                      className="form-field w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Require Authentication</h3>
                      <p className="text-sm text-gray-500">Force users to authenticate before signing</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={accountSettings.requireAuthentication}
                      onChange={(e) => setAccountSettings({...accountSettings, requireAuthentication: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Allow Delegation</h3>
                      <p className="text-sm text-gray-500">Allow users to delegate signature authority</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={accountSettings.allowDelegation}
                      onChange={(e) => setAccountSettings({...accountSettings, allowDelegation: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Auto Archive</h3>
                      <p className="text-sm text-gray-500">Automatically archive completed transactions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={accountSettings.autoArchive}
                      onChange={(e) => setAccountSettings({...accountSettings, autoArchive: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Retention (Days)
                  </label>
                  <input
                    type="number"
                    value={accountSettings.retentionDays}
                    onChange={(e) => setAccountSettings({...accountSettings, retentionDays: parseInt(e.target.value)})}
                    className="form-field w-full"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Documents will be automatically deleted after this period
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Email Templates */}
          {activeTab === 'templates' && (
            <div className="wells-fargo-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Email Templates</h2>
                <button
                  onClick={addEmailTemplate}
                  className="wells-fargo-button-secondary flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Template</span>
                </button>
              </div>

              <div className="space-y-6">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={template.name}
                        onChange={(e) => handleEmailTemplateUpdate(template.id, {name: e.target.value})}
                        className="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                      />
                      <button
                        onClick={() => removeEmailTemplate(template.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject Line
                        </label>
                        <input
                          type="text"
                          value={template.subject}
                          onChange={(e) => handleEmailTemplateUpdate(template.id, {subject: e.target.value})}
                          className="form-field w-full"
                          placeholder="Email subject with variables like {{transactionTitle}}"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Body
                        </label>
                        <textarea
                          value={template.body}
                          onChange={(e) => handleEmailTemplateUpdate(template.id, {body: e.target.value})}
                          className="form-field w-full"
                          rows={8}
                          placeholder="Email body with variables like {{recipientName}}, {{signatureLink}}, etc."
                        />
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">Available Variables:</h4>
                        <div className="text-xs text-blue-800 space-y-1">
                          <div><code>{'{{transactionTitle}}'}</code> - Transaction title</div>
                          <div><code>{'{{recipientName}}'}</code> - Recipient's name</div>
                          <div><code>{'{{signatureLink}}'}</code> - Link to sign document</div>
                          <div><code>{'{{dueDate}}'}</code> - Due date</div>
                          <div><code>{'{{senderName}}'}</code> - Sender's name</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="wells-fargo-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Send email notifications for transaction updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Send SMS notifications for urgent transactions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Escalation Enabled</h3>
                      <p className="text-sm text-gray-500">Automatically escalate overdue transactions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.escalationEnabled}
                      onChange={(e) => setNotificationSettings({...notificationSettings, escalationEnabled: e.target.checked})}
                      className="h-4 w-4 text-wells-fargo-red focus:ring-wells-fargo-red border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reminder Frequency
                    </label>
                    <select
                      value={notificationSettings.reminderFrequency}
                      onChange={(e) => setNotificationSettings({...notificationSettings, reminderFrequency: e.target.value})}
                      className="form-field w-full"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Escalation Days
                    </label>
                    <input
                      type="number"
                      value={notificationSettings.escalationDays}
                      onChange={(e) => setNotificationSettings({...notificationSettings, escalationDays: parseInt(e.target.value)})}
                      className="form-field w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div className="wells-fargo-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">User Roles & Permissions</h2>
              <div className="space-y-4">
                {userRoles.map((role) => (
                  <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <span key={permission} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="wells-fargo-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-800 mb-2">Password Policy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-700">Minimum 8 characters</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-700">Require uppercase letter</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-700">Require number</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-700">Require special character</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Session Management</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Session timeout: 30 minutes</span>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Multi-factor authentication: Enabled</span>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Audit Logging</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700">Login attempts: Logged</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700">Document access: Logged</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700">Signature events: Logged</span>
                      <span className="text-sm text-green-600">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="wells-fargo-card p-6">
            <div className="flex justify-end">
              <button
                onClick={saveSettings}
                className="wells-fargo-button flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
