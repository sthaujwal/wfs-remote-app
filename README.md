# Wells Fargo Signature Platform

A comprehensive electronic signature solution similar to DocuSign, built specifically for Wells Fargo with their branding and security requirements.

## Features

### 🔐 Authentication & Authorization
- Role-based access control (Admin, User, Manager, Reviewer)
- Secure login with demo accounts
- Session management

### 📄 Document Management
- PDF upload and viewing
- Drag-and-drop form field placement
- Signature field creation
- Document preview and editing

### ✍️ Signature Workflow
- Multi-step transaction creation
- Recipient management
- Email notifications
- Status tracking and timeline

### 👥 User Management
- Add multiple recipients with different roles
- Signature order management
- Progress tracking

### ⚙️ Admin Panel
- Account settings configuration
- Email template management
- Notification preferences
- User role management
- Security settings

## Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@wellsfargo.com | admin123 | Full system access including admin panel |
| User | user@wellsfargo.com | user123 | Create and manage transactions |
| Manager | manager@wellsfargo.com | manager123 | Create and manage transactions |

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

4. **Login with demo account:**
   Use any of the demo accounts listed above

## Technology Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS with Wells Fargo theming
- **PDF Handling:** react-pdf, pdfjs-dist
- **Drag & Drop:** react-dnd
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **UI Components:** Headless UI

## Key Components

### Authentication
- `AuthContext.jsx` - Authentication state management
- `Login.jsx` - Login form with demo accounts

### Layout & Navigation
- `Layout.jsx` - Main application layout with sidebar
- `Dashboard.jsx` - Transaction overview and statistics

### Document Management
- `PDFViewer.jsx` - PDF display with field overlay
- `FieldPalette.jsx` - Drag-and-drop field components
- `TransactionCreate.jsx` - Multi-step transaction creation
- `TransactionView.jsx` - Transaction details and management

### Administration
- `AdminPanel.jsx` - System administration interface

## Wells Fargo Branding

The application uses Wells Fargo's official color scheme:
- **Primary Red:** #D71E2B
- **Dark Red:** #B71C1C
- **Blue:** #1E3A8A
- **Gray:** #6B7280

## Security Features

- Role-based access control
- Session management
- Audit logging capabilities
- Document retention policies
- Multi-factor authentication support

## Future Enhancements

- Real backend integration
- Advanced signature capture
- Mobile responsiveness improvements
- Bulk transaction processing
- Advanced reporting and analytics
- Integration with Wells Fargo systems

## Development

This is a Proof of Concept (POC) demonstrating the core functionality of an electronic signature platform. The application includes mock data and simulated backend operations for demonstration purposes.

## License

© 2024 Wells Fargo & Company. All rights reserved.