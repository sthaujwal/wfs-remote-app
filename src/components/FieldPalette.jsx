import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  Signature, 
  Type, 
  Calendar, 
  Mail, 
  Phone,
  MapPin,
  Circle,
  Square
} from 'lucide-react';

const FieldPalette = () => {
  const fieldTypes = [
    { type: 'signature', label: 'Signature', icon: Signature, color: 'text-blue-600' },
    { type: 'text', label: 'Text Field', icon: Type, color: 'text-gray-600' },
    { type: 'date', label: 'Date', icon: Calendar, color: 'text-green-600' },
    { type: 'email', label: 'Email', icon: Mail, color: 'text-purple-600' },
    { type: 'phone', label: 'Phone', icon: Phone, color: 'text-orange-600' },
    { type: 'address', label: 'Address', icon: MapPin, color: 'text-red-600' },
    { type: 'radio', label: 'Radio Button', icon: Circle, color: 'text-indigo-600' },
    { type: 'checkbox', label: 'Checkbox', icon: Square, color: 'text-teal-600' }
  ];

  const FieldItem = ({ fieldType }) => {
    const [{ isDragging }, drag] = useDrag({
      type: fieldType.type,
      item: { type: fieldType.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const Icon = fieldType.icon;

    return (
      <div
        ref={drag}
        className={`p-3 border border-gray-200 rounded-lg cursor-move transition-all hover:shadow-md hover:border-wells-fargo-red ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 ${fieldType.color}`} />
          <span className="text-sm font-medium text-gray-700">
            {fieldType.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Form Fields
        </h3>
        <p className="text-xs text-gray-600">
          Drag and drop fields onto your document
        </p>
      </div>
      
      <div className="space-y-2">
        {fieldTypes.map((fieldType) => (
          <FieldItem key={fieldType.type} fieldType={fieldType} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
        <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center">
          <span className="mr-2">💡</span>
          Quick Guide
        </h4>
        <ul className="text-xs text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Drag a field from above</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Drop it on the PDF page</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Click to edit field values</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Hover and click trash to remove</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FieldPalette;
