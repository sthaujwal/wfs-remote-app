import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
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

// Set up PDF.js worker - using public directory for Vite
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

const PDFViewer = ({ file, onFieldAdd, fields = [], onFieldUpdate, onFieldDelete }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

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

  // Sync containerRef size with rendered Page dimensions
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const updateContainerSize = () => {
      const pageElement = containerRef.current.querySelector('.react-pdf__Page, canvas');
      if (pageElement && containerRef.current) {
        const pageRect = pageElement.getBoundingClientRect();
        if (pageRect.width && pageRect.height) {
          containerRef.current.style.width = `${pageRect.width}px`;
          containerRef.current.style.height = `${pageRect.height}px`;
        }
      }
    };
    
    // Update after Page renders
    const timers = [
      setTimeout(updateContainerSize, 100),
      setTimeout(updateContainerSize, 500),
      setTimeout(updateContainerSize, 1000)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
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
    accept: ['signature', 'text', 'date', 'email', 'phone', 'address', 'radio', 'checkbox'],
    drop: (item, monitor) => {
      if (!containerRef.current) return;
      
      const offset = monitor.getClientOffset();
      if (!offset) return;
      
      // Calculate position relative to containerRef - this is our single source of truth
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = offset.x - containerRect.left;
      const y = offset.y - containerRect.top;
      
      // Get container dimensions - these should match the overlay exactly
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      // Validate bounds
      if (x < 0 || y < 0 || x > containerWidth || y > containerHeight) {
        return; // Drop was outside the container
      }
      
      if (containerWidth > 0 && containerHeight > 0) {
        // Calculate percentage-based positioning - relative to container which matches overlay
        const xPercent = (x / containerWidth) * 100;
        const yPercent = (y / containerHeight) * 100;
        
        // Ensure the field is positioned within bounds (accounting for field size)
        const fieldWidth = 200;
        const fieldHeight = 40;
        const fieldWidthPercent = (fieldWidth / containerWidth) * 100;
        const fieldHeightPercent = (fieldHeight / containerHeight) * 100;
        const maxXPercent = Math.max(0, 100 - fieldWidthPercent);
        const maxYPercent = Math.max(0, 100 - fieldHeightPercent);
        const clampedXPercent = Math.max(0, Math.min(xPercent, maxXPercent));
        const clampedYPercent = Math.max(0, Math.min(yPercent, maxYPercent));
        
        const newField = {
          id: Date.now(),
          type: item.type,
          x: x,
          y: y,
          xPercent: clampedXPercent,
          yPercent: clampedYPercent,
          page: pageNumber,
          width: fieldWidth,
          height: fieldHeight,
          label: getFieldLabel(item.type),
          value: '',
          required: false
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
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              -
            </button>
            <span className="text-sm text-gray-600 w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(2.0, scale + 0.1))}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
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
                          ref={(node) => {
                            containerRef.current = node;
                            drop(node);
                          }}
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
                            className="absolute inset-0" 
                            style={{ 
                              zIndex: 10, 
                              pointerEvents: 'none',
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
                            
                            // Use percentage-based positioning - these percentages are relative to containerRef
                            const leftPercent = field.xPercent !== undefined ? field.xPercent : (field.x / 800) * 100;
                            const topPercent = field.yPercent !== undefined ? field.yPercent : (field.y / 600) * 100;
                            
                            return (
                              <div
                                key={field.id}
                                className={`absolute border-2 border-dashed cursor-pointer transition-all hover:shadow-md group ${getFieldStyling(field)}`}
                                style={{
                                  left: `${leftPercent}%`,
                                  top: `${topPercent}%`,
                                  width: field.width || 200,
                                  height: field.height || 40,
                                  zIndex: 20,
                                  pointerEvents: 'auto'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFieldClick(field);
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
                              </div>
                            );
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
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No PDF file loaded</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;