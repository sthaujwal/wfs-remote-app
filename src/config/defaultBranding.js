/**
 * Default Wells Fargo Branding Configuration
 * This serves as the fallback branding when account-specific branding is unavailable
 */

export const DEFAULT_BRANDING = {
  id: 'wells-fargo-core',
  name: 'Wells Fargo Core',
  colors: {
    primary: '#D71E2B',
    secondary: '#FFB81C',
    primaryDark: '#A01A23',
    primaryHover: '#B81E2A',
    background: '#f8fafc',
    backgroundGradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    surface: '#FFFFFF',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',
    // Additional Wells Fargo specific colors
    gold: '#FFB81C',
    goldDark: '#E5A017',
    blue: '#1E3A8A',
    darkBlue: '#1E40AF',
    gray: '#6B7280',
    lightGray: '#F3F4F6',
    darkGray: '#374151',
    white: '#FFFFFF',
    offWhite: '#FAFAFA',
  },
  fonts: {
    primary: "'Playfair Display', 'Merriweather', 'Georgia', 'Times New Roman', serif",
    body: "'Merriweather', 'Georgia', 'Times New Roman', serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap&family=Playfair+Display:wght@400;500;600;700;800;900&family=Merriweather:wght@300;400;700;900&display=swap",
  },
  logos: {
    main: '/logos/wells-fargo.svg',
    favicon: '/favicons/wells-fargo.ico',
    loginLogo: '/logos/wells-fargo.svg',
    sidebarLogo: '/logos/wells-fargo.svg',
  },
  components: {
    button: {
      borderRadius: '0.75rem',
      shadow: '0 4px 12px rgba(215, 30, 43, 0.15)',
      gradient: 'linear-gradient(135deg, #D71E2B 0%, #B81E2A 100%)',
    },
    card: {
      borderRadius: '1rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    input: {
      borderRadius: '0.5rem',
      focusRing: 'rgba(215, 30, 43, 0.1)',
    },
  },
  metadata: {
    appName: 'eSignature Studio',
    footerText: '© 2024 Wells Fargo & Company. All rights reserved. | eSignature Studio',
    loginTitle: 'eSignature Studio - Digital Signing Platform',
  },
};

/**
 * Example branding configurations for different accounts
 * These would normally come from the backend API
 */
export const EXAMPLE_BRANDINGS = {
  'wells-fargo-ebrokerage': {
    id: 'wells-fargo-ebrokerage',
    name: 'Wells Fargo EBrokerage',
    colors: {
      primary: '#1E3A8A', // Blue focus for brokerage
      secondary: '#FFB81C',
      primaryDark: '#1E40AF',
      primaryHover: '#2563EB',
      background: '#f0f4f8',
      backgroundGradient: 'linear-gradient(135deg, #f0f4f8 0%, #e0e7ef 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#4b5563',
      border: '#cbd5e1',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#2563EB',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-ebrokerage.svg',
      favicon: '/favicons/ebrokerage.ico',
      loginLogo: '/logos/wells-fargo-ebrokerage.svg',
      sidebarLogo: '/logos/wells-fargo-ebrokerage.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 12px rgba(30, 58, 138, 0.15)',
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.375rem',
        focusRing: 'rgba(30, 58, 138, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo EBrokerage',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Wells Fargo EBrokerage',
    },
  },
  'fccaccessonline': {
    id: 'fccaccessonline',
    name: 'FCC Access Online',
    colors: {
      primary: '#0066CC',
      secondary: '#00A651',
      primaryDark: '#0052A3',
      primaryHover: '#0073E6',
      background: '#f5f7fa',
      backgroundGradient: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      border: '#d1d5db',
      success: '#00A651',
      warning: '#FF9800',
      error: '#E53935',
      info: '#0066CC',
    },
    fonts: {
      primary: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
    },
    logos: {
      main: '/logos/fccaccessonline.svg',
      favicon: '/favicons/fccaccessonline.ico',
      loginLogo: '/logos/fccaccessonline.svg',
      sidebarLogo: '/logos/fccaccessonline.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 2px 8px rgba(0, 102, 204, 0.2)',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #0073E6 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      input: {
        borderRadius: '0.375rem',
        focusRing: 'rgba(0, 102, 204, 0.1)',
      },
    },
    metadata: {
      appName: 'FCC Access Online',
      footerText: '© 2024 FCC Access Online. All rights reserved.',
      loginTitle: 'FCC Access Online',
    },
  },
};

