import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  FileText, 
  Signature, 
  Type, 
  Calendar, 
  Mail, 
  Phone,
  MapPin,
  Trash2,
  Edit3,
  Download,
  Eye,
  Circle,
  Square,
  Loader
} from 'lucide-react';

// PDF.js worker: serve from public to avoid dynamic ESM import issues in Vite
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

const PDFViewer = ({ file, onFieldAdd, fields = [], onFieldUpdate, onFieldDelete, recipients = [] }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecipientSelector, setShowRecipientSelector] = useState(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  // Create object URL when file changes
  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setPageNumber(1);
      setNumPages(null);
      setError(null);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Sync containerRef size with rendered Page dimensions using ResizeObserver
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const updateContainerSize = () => {
      const pageElement = containerRef.current?.querySelector('.react-pdf__Page canvas');
      if (pageElement && containerRef.current) {
        const pageRect = pageElement.getBoundingClientRect();
        if (pageRect.width && pageRect.height) {
          containerRef.current.style.width = `${pageRect.width}px`;
          containerRef.current.style.height = `${pageRect.height}px`;
        }
      }
    };
    
    const pageElement = containerRef.current.querySelector('.react-pdf__Page canvas');
    if (pageElement) {
      const resizeObserver = new ResizeObserver(() => {
        updateContainerSize();
      });
      
      resizeObserver.observe(pageElement);
      updateContainerSize(); // Initial update
      
      return () => resizeObserver.disconnect();
    }
    
    updateContainerSize();
  }, [pageNumber, scale, numPages, fileUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message || 'Failed to load PDF');
    setLoading(false);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ['signature', 'text', 'date', 'email', 'phone', 'address', 'radio', 'checkbox', 'EXISTING_FIELD'],
    drop: (item, monitor) => {
      if (!overlayRef.current) return;
      
      const offset = monitor.getClientOffset();
      if (!offset) return;
      
      const rect = overlayRef.current.getBoundingClientRect();
      
      if (!rect?.width || !rect?.height) {
        return;
      }
      
      const x = offset.x - rect.left;
      const y = offset.y - rect.top;
      
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      if (!Number.isFinite(xPercent) || !Number.isFinite(yPercent)) {
        return;
      }
      
      const widthPercent = 25;
      const heightPercent = 6;
      
      const maxXPercent = Math.max(0, 100 - widthPercent);
      const maxYPercent = Math.max(0, 100 - heightPercent);
      const clampedXPercent = Math.min(Math.max(xPercent, 0), maxXPercent);
      const clampedYPercent = Math.min(Math.max(yPercent, 0), maxYPercent);
      
      if (item.fieldType === 'existing') {
        onFieldUpdate(item.id, {
          ...fields.find(f => f.id === item.id),
          xPercent: clampedXPercent,
          yPercent: clampedYPercent
        });
      } else {
        const newField = {
          id: Date.now(),
          type: item.type,
          xPercent: clampedXPercent,
          yPercent: clampedYPercent,
          widthPercent: widthPercent,
          heightPercent: heightPercent,
          page: pageNumber,
          label: getFieldLabel(item.type),
          value: '',
          required: false,
          recipientId: null
        };
        
        onFieldAdd(newField);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getFieldLabel = (type) => {
    const labels = {
      signature: 'Signature',
      text: 'Text Field',
      date: 'Date',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      radio: 'Radio Button',
      checkbox: 'Checkbox'
    };
    return labels[type] || 'Field';
  };

  const getFieldIcon = (type) => {
    const icons = {
      signature: Signature,
      text: Type,
      date: Calendar,
      email: Mail,
      phone: Phone,
      address: MapPin,
      radio: Circle,
      checkbox: Square
    };
    return icons[type] || FileText;
  };

  const getRecipientColor = (recipientId) => {
    if (!recipientId) return null;
    const colors = [
      'border-blue-500 bg-blue-50',
      'border-green-500 bg-green-50',
      'border-purple-500 bg-purple-50',
      'border-orange-500 bg-orange-50',
      'border-pink-500 bg-pink-50',
      'border-teal-500 bg-teal-50',
      'border-indigo-500 bg-indigo-50',
      'border-red-500 bg-red-50'
    ];
    const index = recipients.findIndex(r => r.id === recipientId);
    return index >= 0 ? colors[index % colors.length] : null;
  };

  const handleFieldClick = (field) => {
    if (field.type === 'signature') {
      // Special handling for signature fields
      const signature = prompt(`Enter signature text or draw signature for ${field.label}:`, field.value || '');
      if (signature !== null) {
        onFieldUpdate(field.id, { ...field, value: signature || '✓ Signed' });
      }
    } else if (field.type === 'radio') {
      // Radio button handling
      const options = prompt(`Enter radio button options (separated by commas):`, field.options || 'Yes, No');
      if (options !== null) {
        onFieldUpdate(field.id, { ...field, options: options, value: field.value || 'Not selected' });
      }
    } else if (field.type === 'checkbox') {
      // Checkbox handling
      const checked = field.value === 'checked';
      onFieldUpdate(field.id, { ...field, value: checked ? 'unchecked' : 'checked' });
    } else {
      // Regular field editing
      const newValue = prompt(`Enter value for ${field.label}:`, field.value);
      if (newValue !== null) {
        onFieldUpdate(field.id, { ...field, value: newValue });
      }
    }
  };

  const pageFields = fields.filter(field => field.page === pageNumber);

  return (
    <div className="flex flex-col h-full">
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pageNumber}
          </span>
          <button
            onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
          {numPages && (
            <span className="text-xs text-gray-500">of {numPages}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScale(1.0)}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 font-medium"
              title="Actual Size (100%)"
            >
              100%
            </button>
            <button
              onClick={() => setScale(1.5)}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 font-medium"
              title="Fit Width"
            >
              Fit
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              title="Zoom Out"
            >
              -
            </button>
            <input
              type="number"
              value={Math.round(scale * 100)}
              onChange={(e) => {
                const newScale = parseInt(e.target.value) / 100;
                if (newScale >= 0.5 && newScale <= 2.0) {
                  setScale(newScale);
                }
              }}
              className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-wells-fargo-red"
              min="50"
              max="200"
            />
            <span className="text-xs text-gray-500">%</span>
            <button
              onClick={() => setScale(Math.min(2.0, scale + 0.1))}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              title="Zoom In"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Preview Mode"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <div className="flex justify-center">
          {fileUrl ? (
            <div className="pdf-container">
              <div className="pdf-header-info mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Document Preview</h3>
                <p className="text-sm text-blue-600">PDF: {file?.name}</p>
                <p className="text-xs text-blue-500 mt-1">You can add form fields by dragging them from the left panel</p>
              </div>
              
              {/* PDF Display with Overlay */}
              <div className="pdf-display-container relative flex justify-center">
                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <Loader className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Loading PDF...</p>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Error loading PDF</p>
                    <p className="text-xs text-red-500 mt-1">{error}</p>
                    <p className="text-xs text-gray-500 mt-2">Please try uploading the PDF again</p>
                  </div>
                )}
                
                {!error && !loading && fileUrl && (
                  <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex items-center justify-center p-8 bg-white rounded border">
                        <div className="text-center">
                          <Loader className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Loading PDF...</p>
                        </div>
                      </div>
                    }
                  >
                    <div 
                      className={`relative ${isOver ? 'ring-4 ring-red-500 ring-opacity-50 rounded-lg' : ''}`}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        background: 'white',
                        overflow: 'visible',
                        display: 'inline-block',
                        position: 'relative'
                      }}
                    >
                        {/* Single container that wraps both PDF Page and overlay - this ensures coordinate system matches */}
                        <div 
                          ref={containerRef}
                          style={{ 
                            position: 'relative', 
                            display: 'inline-block'
                          }}
                        >
                          {/* PDF Page - will determine the container size */}
                          <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="pdf-page"
                          />
                          
                          {/* Overlay that matches container exactly - fields rendered here */}
                          <div 
                            ref={(node) => {
                              overlayRef.current = node;
                              drop(node);
                            }}
                            className="absolute inset-0" 
                            style={{ 
                              zIndex: 10, 
                              pointerEvents: 'auto',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0
                            }}
                          >
                          {pageFields.map((field) => {
                            const Icon = getFieldIcon(field.type);
                            const getFieldStyling = (field) => {
                              const recipientColor = getRecipientColor(field.recipientId);
                              if (recipientColor) {
                                return recipientColor;
                              }
                              
                              if (field.type === 'signature') {
                                return field.value ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50';
                              } else if (field.type === 'radio') {
                                return 'border-indigo-500 bg-indigo-50';
                              } else if (field.type === 'checkbox') {
                                return field.value === 'checked' ? 'border-teal-500 bg-teal-50' : 'border-teal-400 bg-teal-25';
                              } else {
                                return field.value ? 'border-green-500 bg-green-50' : 'border-gray-400 bg-gray-50';
                              }
                            };
                            
                            const leftPercent = field.xPercent ?? 0;
                            const topPercent = field.yPercent ?? 0;
                            const widthPercent = field.widthPercent ?? 25;
                            const heightPercent = field.heightPercent ?? 6;
                            
                            const FieldComponent = () => {
                              const [{ isDragging }, drag] = useDrag({
                                type: 'EXISTING_FIELD',
                                item: { id: field.id, fieldType: 'existing' },
                                collect: (monitor) => ({
                                  isDragging: monitor.isDragging(),
                                }),
                              });
                              
                              return (
                              <div
                                ref={drag}
                                key={field.id}
                                className={`absolute border-2 border-dashed cursor-move transition-all hover:shadow-md group ${getFieldStyling(field)}`}
                                style={{
                                  left: `${leftPercent}%`,
                                  top: `${topPercent}%`,
                                  width: `${widthPercent}%`,
                                  height: `${heightPercent}%`,
                                  zIndex: 20,
                                  pointerEvents: 'auto',
                                  opacity: isDragging ? 0.5 : 1
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRecipientSelector(showRecipientSelector === field.id ? null : field.id);
                                }}
                              >
                                <div className="flex items-center justify-between h-full p-2">
                                  <div className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4 text-gray-600" />
                                    <span className="text-xs font-medium text-gray-700">
                                      {field.label}
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onFieldDelete(field.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                                    title="Delete field"
                                  >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                  </button>
                                </div>
                                
                                {field.value && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 pointer-events-none">
                                    {field.type === 'checkbox' ? (
                                      <span className="text-xs text-gray-600">
                                        {field.value === 'checked' ? '☑' : '☐'}
                                      </span>
                                    ) : field.type === 'radio' ? (
                                      <span className="text-xs text-gray-600 truncate px-2">
                                        {field.value}
                                      </span>
                                    ) : field.type === 'signature' ? (
                                      <span className="text-xs text-green-600 font-bold truncate px-2">
                                        {field.value}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-600 truncate px-2">
                                        {field.value}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                {showRecipientSelector === field.id && recipients.length > 0 && (
                                  <div 
                                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-[200px]"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="p-2 border-b border-gray-200 bg-gray-50">
                                      <span className="text-xs font-semibold text-gray-700">Assign to Recipient</span>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                      <button
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 border-b border-gray-100"
                                        onClick={() => {
                                          onFieldUpdate(field.id, { ...field, recipientId: null });
                                          setShowRecipientSelector(null);
                                        }}
                                      >
                                        <span className="text-gray-500">Unassigned</span>
                                      </button>
                                      {recipients.map((recipient) => (
                                        <button
                                          key={recipient.id}
                                          className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 border-b border-gray-100 ${
                                            field.recipientId === recipient.id ? 'bg-blue-50' : ''
                                          }`}
                                          onClick={() => {
                                            onFieldUpdate(field.id, { ...field, recipientId: recipient.id });
                                            setShowRecipientSelector(null);
                                          }}
                                        >
                                          <div className="font-medium text-gray-900">{recipient.name}</div>
                                          <div className="text-gray-500">{recipient.email}</div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              );
                            };
                            
                            return <FieldComponent key={field.id} />;
                          })}
                          </div>
                        
                        {/* Drop zone indicator */}
                        {isOver && (
                          <div className="absolute inset-0 border-4 border-dashed border-red-500 bg-red-50 bg-opacity-30 flex items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>
                            <div className="text-red-600 font-bold bg-white px-6 py-3 rounded-lg shadow-xl text-lg">
                              ✋ Drop field here
                            </div>
                          </div>
                        )}
                        </div>
                    </div>
                    </Document>
                  )}
                </div>
              </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center p-8">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Document Loaded</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a PDF document to start adding form fields</p>
                <div className="text-xs text-gray-400">
                  <p>• Drag fields from the left palette</p>
                  <p>• Drop them onto the PDF pages</p>
                  <p>• Click fields to edit their values</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
