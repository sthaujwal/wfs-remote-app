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
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Form Fields
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Drag fields onto the document to add them
      </p>
      
      <div className="space-y-3">
        {fieldTypes.map((fieldType) => (
          <FieldItem key={fieldType.type} fieldType={fieldType} />
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Instructions
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Drag fields from this palette</li>
          <li>• Drop them on the PDF document</li>
          <li>• Click fields to edit values</li>
          <li>• Use the trash icon to remove</li>
        </ul>
      </div>
    </div>
  );
};

export default FieldPalette;
