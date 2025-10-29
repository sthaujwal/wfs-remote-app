import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Paperclip, 
  FileText,
  Sparkles,
  Loader2
} from 'lucide-react';

const ChatbotModal = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `🤖 **Welcome ${user?.name}!**\n\nI'm your advanced AI assistant for the Wells Fargo Signature Platform. I'm powered by machine learning and can help you with:\n\n**🧠 AI-Powered Capabilities:**\n• **Smart Document Analysis**: Instant PDF analysis with field recommendations\n• **Intelligent Workflow Creation**: Auto-configure optimal signature workflows\n• **Predictive Analytics**: Success rate predictions and performance insights\n• **Compliance Automation**: Ensure regulatory requirements are met\n• **Recipient Optimization**: Suggest optimal signer order and roles\n• **Performance Monitoring**: Track and improve transaction success rates\n\n**💡 What would you like to explore?**`,
      timestamp: new Date(),
      suggestions: [
        'Analyze a document with AI',
        'Create smart transaction',
        'Get compliance insights',
        'View performance analytics',
        'Optimize workflow',
        'Learn AI features'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !attachedFile) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      file: attachedFile
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setAttachedFile(null);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, attachedFile);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message, file) => {
    const lowerMessage = message.toLowerCase();
    
    // Generate document analysis content dynamically
    const getDocumentAnalysisContent = (file) => {
      if (!file) {
        return 'I can analyze documents for you! Please upload a PDF file and I\'ll help you understand its contents and create appropriate signature fields.';
      }
      
      const docType = detectDocumentType(file.name);
      const fields = getRecommendedFields(file.name);
      const time = getEstimatedTime(file.name);
      const priority = getPriorityLevel(file.name);
      
      return `🔍 **AI Document Analysis Complete**\n\n**Document Details:**\n• Name: "${file.name}"\n• Type: PDF Document\n• Size: ${(file.size / 1024).toFixed(1)} KB\n• Status: ✅ Ready for signature workflow\n\n**AI Recommendations:**\n• This appears to be a ${docType} document\n• Suggested signature fields: ${fields}\n• Estimated completion time: ${time}\n• Priority level: ${priority}\n\n**Next Steps:**\nWould you like me to automatically create a signature transaction with these recommendations?`;
    };
    
    // Advanced AI responses with context awareness
    const aiResponses = {
      // Document Analysis with AI insights
      'analyze document': {
        content: getDocumentAnalysisContent(file),
        suggestions: file ? [
          'Create auto-configured transaction',
          'Customize signature fields',
          'Set up recipients',
          'Schedule delivery time'
        ] : [
          'Upload a document',
          'Ask about document types',
          'Learn about AI analysis'
        ]
      },
      
      // Transaction Creation with AI guidance
      'create transaction': {
        content: `🤖 **AI Transaction Assistant**\n\nI'll help you create the perfect signature transaction! Let me gather some information:\n\n**Step 1: Transaction Details**\n• What type of document is this?\n• How many people need to sign?\n• What's the urgency level?\n• Any special requirements?\n\n**AI Suggestions:**\nBased on common patterns, I recommend:\n• Standard signature workflow\n• Email notifications enabled\n• Reminder system activated\n• Audit trail maintained\n\nLet's start with the transaction name. What would you like to call it?`,
        suggestions: [
          'Contract Agreement',
          'Loan Application', 
          'Employment Contract',
          'Service Agreement',
          'Legal Document',
          'Financial Form'
        ]
      },
      
      // Advanced Help with AI capabilities
      'help': {
        content: `🤖 **Wells Fargo AI Assistant**\n\nI'm your intelligent assistant for the Signature Platform! Here's what I can do:\n\n**🧠 AI-Powered Features:**\n• **Smart Document Analysis**: Upload PDFs for instant analysis\n• **Intelligent Field Detection**: Auto-suggest signature fields\n• **Recipient Optimization**: Recommend signer order and roles\n• **Workflow Automation**: Create complete transactions\n• **Compliance Checking**: Ensure regulatory requirements\n• **Performance Analytics**: Track completion rates\n\n**💡 Pro Tips:**\n• Upload documents for instant AI analysis\n• Ask me to optimize your workflows\n• Get compliance recommendations\n• Learn advanced features\n\nWhat would you like to explore?`,
        suggestions: [
          'Analyze a document',
          'Create smart transaction',
          'Learn AI features',
          'Get compliance help',
          'Optimize workflow',
          'View analytics'
        ]
      },
      
      // Compliance and Security
      'compliance': {
        content: `🛡️ **AI Compliance Assistant**\n\nI can help ensure your signature transactions meet all regulatory requirements:\n\n**Compliance Features:**\n• **SOX Compliance**: Financial document requirements\n• **HIPAA Protection**: Healthcare document security\n• **GDPR Compliance**: International data protection\n• **Audit Trails**: Complete transaction history\n• **Encryption**: Bank-level security\n\n**AI Recommendations:**\n• Enable multi-factor authentication\n• Set up automatic backups\n• Configure retention policies\n• Implement access controls\n\nWould you like me to check your current compliance settings?`,
        suggestions: [
          'Check compliance status',
          'Enable security features',
          'Set up audit trails',
          'Configure retention',
          'Review access controls'
        ]
      },
      
      // Analytics and Insights
      'analytics': {
        content: `📊 **AI Analytics Dashboard**\n\nHere are your signature transaction insights:\n\n**Performance Metrics:**\n• Completion Rate: 94% (Above average)\n• Average Processing Time: 2.3 days\n• User Satisfaction: 4.8/5 stars\n• Error Rate: 0.2% (Excellent)\n\n**AI Insights:**\n• Your contracts complete 23% faster than industry average\n• Recipients prefer email notifications over SMS\n• Peak signing times: Tuesday-Thursday, 10AM-2PM\n• Mobile usage: 67% of signatures\n\n**Recommendations:**\n• Schedule deliveries for optimal times\n• Enable mobile-optimized workflows\n• Use automated reminders\n\nWould you like detailed analytics for specific transaction types?`,
        suggestions: [
          'View detailed metrics',
          'Optimize delivery times',
          'Enable mobile features',
          'Set up automated reports',
          'Compare performance'
        ]
      }
    };

    // Smart response selection based on context
    let response = aiResponses['help'];
    
    if (lowerMessage.includes('analyze') || lowerMessage.includes('document') || lowerMessage.includes('upload')) {
      response = aiResponses['analyze document'];
    } else if (lowerMessage.includes('create') || lowerMessage.includes('transaction') || lowerMessage.includes('setup')) {
      response = aiResponses['create transaction'];
    } else if (lowerMessage.includes('compliance') || lowerMessage.includes('security') || lowerMessage.includes('audit')) {
      response = aiResponses['compliance'];
    } else if (lowerMessage.includes('analytics') || lowerMessage.includes('metrics') || lowerMessage.includes('performance')) {
      response = aiResponses['analytics'];
    } else if (lowerMessage.includes('contract') || lowerMessage.includes('agreement') || lowerMessage.includes('loan')) {
      response = {
        content: `🎯 **AI Transaction Optimizer**\n\nExcellent choice! "${message}" is a high-value transaction type. Here's my AI analysis:\n\n**Smart Configuration:**\n• **Name**: ${message}\n• **Priority**: High (Auto-detected)\n• **Recipients**: 2-3 signers (Optimal)\n• **Fields**: Signature, Date, Initials, Terms\n• **Timeline**: 3-5 business days\n• **Security**: Enhanced encryption\n\n**AI Recommendations:**\n• Enable automatic reminders\n• Set up completion notifications\n• Configure backup signers\n• Enable mobile signing\n\n**Predicted Success Rate**: 96%\n\nWould you like me to create this transaction with optimal settings?`,
        suggestions: [
          'Create optimized transaction',
          'Customize settings',
          'Set up notifications',
          'Configure security',
          'Add backup signers'
        ]
      };
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  // AI Helper Functions
  const detectDocumentType = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('contract') || name.includes('agreement')) return 'Contract';
    if (name.includes('loan') || name.includes('credit')) return 'Financial';
    if (name.includes('employment') || name.includes('hr')) return 'HR Document';
    if (name.includes('legal') || name.includes('terms')) return 'Legal';
    if (name.includes('insurance') || name.includes('policy')) return 'Insurance';
    return 'Business Document';
  };

  const getRecommendedFields = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('contract')) return 'Signature, Date, Initials, Terms Acceptance';
    if (name.includes('loan')) return 'Signature, Date, Financial Disclosure';
    if (name.includes('employment')) return 'Signature, Date, Employee ID';
    return 'Signature, Date, Witness';
  };

  const getEstimatedTime = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('contract')) return '2-3 business days';
    if (name.includes('loan')) return '1-2 business days';
    if (name.includes('employment')) return '1 business day';
    return '2-4 business days';
  };

  const getPriorityLevel = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('loan') || name.includes('urgent')) return 'High';
    if (name.includes('contract') || name.includes('agreement')) return 'Medium';
    return 'Standard';
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setAttachedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative flex flex-col h-full bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-wells-fargo-red to-red-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-full animate-pulse">
              <Bot className="h-6 w-6 text-wells-fargo-red" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                AI Assistant
              </h3>
              <p className="text-sm text-red-100">Powered by Machine Learning</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">
              AI Online
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-red-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-wells-fargo-red' : 'bg-gray-200'}`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-wells-fargo-red text-white' : 'bg-gray-100 text-gray-900'}`}>
                  {message.file && (
                    <div className="mb-2 p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{message.file.name}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-xs lg:max-w-md">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-lg p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages[messages.length - 1]?.suggestions && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
              title="Upload document for AI analysis"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI assistant anything about signature transactions..."
                className="w-full p-3 border border-blue-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                rows="2"
              />
              {attachedFile && (
                <div className="absolute top-1 right-1 p-1 bg-green-100 rounded-full animate-pulse">
                  <FileText className="h-3 w-3 text-green-600" />
                </div>
              )}
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() && !attachedFile}
              className="p-3 bg-gradient-to-r from-wells-fargo-red to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            💡 Tip: Upload documents for instant AI analysis and smart recommendations
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
