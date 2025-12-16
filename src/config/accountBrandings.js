/**
 * Account Branding Mappings
 * Maps account IDs and codes to their specific branding configurations
 * This serves as mock data - in production, this would come from a backend API
 */

import { DEFAULT_BRANDING } from './defaultBranding';
import { mergeBrandingConfig } from './brandingSchema';

/**
 * Branding configurations for different accounts
 */
export const ACCOUNT_BRANDINGS = {
  // Corporate Banking Division - Default Wells Fargo Core
  'ACC-001': mergeBrandingConfig({
    id: 'wells-fargo-core',
    name: 'Wells Fargo Core',
  }, DEFAULT_BRANDING),
  'CBD-001': mergeBrandingConfig({
    id: 'wells-fargo-core',
    name: 'Wells Fargo Core',
  }, DEFAULT_BRANDING),

  // Enterprise IT Services - Tech-focused blue theme
  'ACC-002': mergeBrandingConfig({
    id: 'wells-fargo-eis',
    name: 'Wells Fargo Enterprise IT',
    colors: {
      primary: '#0066CC',
      secondary: '#00D4FF',
      primaryDark: '#004C99',
      primaryHover: '#0080FF',
      background: '#f0f7ff',
      backgroundGradient: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a5568',
      border: '#cbd5e0',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0066CC',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-eis.svg',
      favicon: '/favicons/eis.ico',
      loginLogo: '/logos/wells-fargo-eis.svg',
      sidebarLogo: '/logos/wells-fargo-eis.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 12px rgba(0, 102, 204, 0.2)',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #0080FF 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(0, 102, 204, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Enterprise IT',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Wells Fargo Enterprise IT Services',
    },
  }, DEFAULT_BRANDING),
  'EIS-002': mergeBrandingConfig({
    id: 'wells-fargo-eis',
    name: 'Wells Fargo Enterprise IT',
    colors: {
      primary: '#0066CC',
      secondary: '#00D4FF',
      primaryDark: '#004C99',
      primaryHover: '#0080FF',
      background: '#f0f7ff',
      backgroundGradient: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a5568',
      border: '#cbd5e0',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0066CC',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-eis.svg',
      favicon: '/favicons/eis.ico',
      loginLogo: '/logos/wells-fargo-eis.svg',
      sidebarLogo: '/logos/wells-fargo-eis.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 12px rgba(0, 102, 204, 0.2)',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #0080FF 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(0, 102, 204, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Enterprise IT',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Wells Fargo Enterprise IT Services',
    },
  }, DEFAULT_BRANDING),

  // Executive Management - Premium gold and navy theme
  'ACC-003': mergeBrandingConfig({
    id: 'wells-fargo-executive',
    name: 'Wells Fargo Executive',
    colors: {
      primary: '#1a365d',
      secondary: '#D4AF37',
      primaryDark: '#0f2027',
      primaryHover: '#2d4a6b',
      background: '#faf9f6',
      backgroundGradient: 'linear-gradient(135deg, #faf9f6 0%, #f5f3f0 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1a202c',
      textSecondary: '#4a5568',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#1a365d',
    },
    fonts: {
      primary: "'Playfair Display', 'Georgia', serif",
      body: "'Merriweather', 'Georgia', serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Merriweather:wght@300;400;700&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-executive.svg',
      favicon: '/favicons/executive.ico',
      loginLogo: '/logos/wells-fargo-executive.svg',
      sidebarLogo: '/logos/wells-fargo-executive.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 16px rgba(26, 54, 93, 0.25)',
        gradient: 'linear-gradient(135deg, #1a365d 0%, #2d4a6b 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(26, 54, 93, 0.15)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Executive Platform',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Wells Fargo Executive Management',
    },
  }, DEFAULT_BRANDING),
  'EM-003': mergeBrandingConfig({
    id: 'wells-fargo-executive',
    name: 'Wells Fargo Executive',
    colors: {
      primary: '#1a365d',
      secondary: '#D4AF37',
      primaryDark: '#0f2027',
      primaryHover: '#2d4a6b',
      background: '#faf9f6',
      backgroundGradient: 'linear-gradient(135deg, #faf9f6 0%, #f5f3f0 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1a202c',
      textSecondary: '#4a5568',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#1a365d',
    },
    fonts: {
      primary: "'Playfair Display', 'Georgia', serif",
      body: "'Merriweather', 'Georgia', serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Merriweather:wght@300;400;700&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-executive.svg',
      favicon: '/favicons/executive.ico',
      loginLogo: '/logos/wells-fargo-executive.svg',
      sidebarLogo: '/logos/wells-fargo-executive.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 16px rgba(26, 54, 93, 0.25)',
        gradient: 'linear-gradient(135deg, #1a365d 0%, #2d4a6b 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(26, 54, 93, 0.15)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Executive Platform',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Wells Fargo Executive Management',
    },
  }, DEFAULT_BRANDING),

  // Commercial Lending - North Region - Green/teal theme
  'ACC-101': mergeBrandingConfig({
    id: 'wells-fargo-commercial-lending',
    name: 'Wells Fargo Commercial Lending',
    colors: {
      primary: '#047857',
      secondary: '#10B981',
      primaryDark: '#065F46',
      primaryHover: '#059669',
      background: '#f0fdf4',
      backgroundGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#4b5563',
      border: '#d1fae5',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#047857',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-commercial.svg',
      favicon: '/favicons/commercial.ico',
      loginLogo: '/logos/wells-fargo-commercial.svg',
      sidebarLogo: '/logos/wells-fargo-commercial.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(4, 120, 87, 0.2)',
        gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(4, 120, 87, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Commercial Lending',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Commercial Lending - North Region',
    },
  }, DEFAULT_BRANDING),
  'CL-NR-101': mergeBrandingConfig({
    id: 'wells-fargo-commercial-lending',
    name: 'Wells Fargo Commercial Lending',
    colors: {
      primary: '#047857',
      secondary: '#10B981',
      primaryDark: '#065F46',
      primaryHover: '#059669',
      background: '#f0fdf4',
      backgroundGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#4b5563',
      border: '#d1fae5',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#047857',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-commercial.svg',
      favicon: '/favicons/commercial.ico',
      loginLogo: '/logos/wells-fargo-commercial.svg',
      sidebarLogo: '/logos/wells-fargo-commercial.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(4, 120, 87, 0.2)',
        gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(4, 120, 87, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Commercial Lending',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Commercial Lending - North Region',
    },
  }, DEFAULT_BRANDING),

  // Small Business Banking - Orange/amber theme
  'ACC-102': mergeBrandingConfig({
    id: 'wells-fargo-small-business',
    name: 'Wells Fargo Small Business',
    colors: {
      primary: '#EA580C',
      secondary: '#F97316',
      primaryDark: '#C2410C',
      primaryHover: '#F97316',
      background: '#fff7ed',
      backgroundGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#fed7aa',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#EA580C',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-small-business.svg',
      favicon: '/favicons/small-business.ico',
      loginLogo: '/logos/wells-fargo-small-business.svg',
      sidebarLogo: '/logos/wells-fargo-small-business.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
        gradient: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(234, 88, 12, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Small Business Banking',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Small Business Banking',
    },
  }, DEFAULT_BRANDING),
  'SBB-102': mergeBrandingConfig({
    id: 'wells-fargo-small-business',
    name: 'Wells Fargo Small Business',
    colors: {
      primary: '#EA580C',
      secondary: '#F97316',
      primaryDark: '#C2410C',
      primaryHover: '#F97316',
      background: '#fff7ed',
      backgroundGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#fed7aa',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#EA580C',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-small-business.svg',
      favicon: '/favicons/small-business.ico',
      loginLogo: '/logos/wells-fargo-small-business.svg',
      sidebarLogo: '/logos/wells-fargo-small-business.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
        gradient: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(234, 88, 12, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Small Business Banking',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Small Business Banking',
    },
  }, DEFAULT_BRANDING),

  // Regional Operations - Purple/indigo theme
  'ACC-103': mergeBrandingConfig({
    id: 'wells-fargo-regional-ops',
    name: 'Wells Fargo Regional Operations',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      primaryDark: '#4F46E5',
      primaryHover: '#818CF8',
      background: '#f5f3ff',
      backgroundGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#ddd6fe',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#6366F1',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-regional.svg',
      favicon: '/favicons/regional.ico',
      loginLogo: '/logos/wells-fargo-regional.svg',
      sidebarLogo: '/logos/wells-fargo-regional.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
        gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(99, 102, 241, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Regional Operations',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Regional Operations',
    },
  }, DEFAULT_BRANDING),
  'RO-103': mergeBrandingConfig({
    id: 'wells-fargo-regional-ops',
    name: 'Wells Fargo Regional Operations',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      primaryDark: '#4F46E5',
      primaryHover: '#818CF8',
      background: '#f5f3ff',
      backgroundGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#ddd6fe',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#6366F1',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-regional.svg',
      favicon: '/favicons/regional.ico',
      loginLogo: '/logos/wells-fargo-regional.svg',
      sidebarLogo: '/logos/wells-fargo-regional.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
        gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(99, 102, 241, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Regional Operations',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Regional Operations',
    },
  }, DEFAULT_BRANDING),

  // Credit Risk Analysis - Red/crimson theme
  'ACC-201': mergeBrandingConfig({
    id: 'wells-fargo-risk-analysis',
    name: 'Wells Fargo Risk Analysis',
    colors: {
      primary: '#991B1B',
      secondary: '#DC2626',
      primaryDark: '#7F1D1D',
      primaryHover: '#B91C1C',
      background: '#fef2f2',
      backgroundGradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#fecaca',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#DC2626',
      info: '#991B1B',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-risk.svg',
      favicon: '/favicons/risk.ico',
      loginLogo: '/logos/wells-fargo-risk.svg',
      sidebarLogo: '/logos/wells-fargo-risk.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 12px rgba(153, 27, 27, 0.25)',
        gradient: 'linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(153, 27, 27, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Credit Risk Analysis',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Credit Risk Analysis',
    },
  }, DEFAULT_BRANDING),
  'CRA-201': mergeBrandingConfig({
    id: 'wells-fargo-risk-analysis',
    name: 'Wells Fargo Risk Analysis',
    colors: {
      primary: '#991B1B',
      secondary: '#DC2626',
      primaryDark: '#7F1D1D',
      primaryHover: '#B91C1C',
      background: '#fef2f2',
      backgroundGradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#fecaca',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#DC2626',
      info: '#991B1B',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-risk.svg',
      favicon: '/favicons/risk.ico',
      loginLogo: '/logos/wells-fargo-risk.svg',
      sidebarLogo: '/logos/wells-fargo-risk.svg',
    },
    components: {
      button: {
        borderRadius: '0.5rem',
        shadow: '0 4px 12px rgba(153, 27, 27, 0.25)',
        gradient: 'linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)',
      },
      card: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(153, 27, 27, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Credit Risk Analysis',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Credit Risk Analysis',
    },
  }, DEFAULT_BRANDING),

  // Compliance Monitoring - Teal/cyan theme
  'ACC-202': mergeBrandingConfig({
    id: 'wells-fargo-compliance',
    name: 'Wells Fargo Compliance',
    colors: {
      primary: '#0D9488',
      secondary: '#14B8A6',
      primaryDark: '#0F766E',
      primaryHover: '#2DD4BF',
      background: '#f0fdfa',
      backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#99f6e4',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0D9488',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-compliance.svg',
      favicon: '/favicons/compliance.ico',
      loginLogo: '/logos/wells-fargo-compliance.svg',
      sidebarLogo: '/logos/wells-fargo-compliance.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
        gradient: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(13, 148, 136, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Compliance Monitoring',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Compliance Monitoring',
    },
  }, DEFAULT_BRANDING),
  'CM-202': mergeBrandingConfig({
    id: 'wells-fargo-compliance',
    name: 'Wells Fargo Compliance',
    colors: {
      primary: '#0D9488',
      secondary: '#14B8A6',
      primaryDark: '#0F766E',
      primaryHover: '#2DD4BF',
      background: '#f0fdfa',
      backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
      surface: '#FFFFFF',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: '#99f6e4',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0D9488',
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    },
    logos: {
      main: '/logos/wells-fargo-compliance.svg',
      favicon: '/favicons/compliance.ico',
      loginLogo: '/logos/wells-fargo-compliance.svg',
      sidebarLogo: '/logos/wells-fargo-compliance.svg',
    },
    components: {
      button: {
        borderRadius: '0.75rem',
        shadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
        gradient: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
      },
      card: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      input: {
        borderRadius: '0.5rem',
        focusRing: 'rgba(13, 148, 136, 0.1)',
      },
    },
    metadata: {
      appName: 'Wells Fargo Compliance Monitoring',
      footerText: '© 2024 Wells Fargo & Company. All rights reserved.',
      loginTitle: 'Compliance Monitoring',
    },
  }, DEFAULT_BRANDING),
};

/**
 * Gets branding configuration for an account by ID or code
 * @param {string} accountId - Account ID
 * @param {string} accountCode - Account code
 * @returns {Object|null} - Branding configuration or null if not found
 */
export const getBrandingByAccount = (accountId, accountCode) => {
  // Try account ID first
  if (accountId && ACCOUNT_BRANDINGS[accountId]) {
    return ACCOUNT_BRANDINGS[accountId];
  }

  // Try account code
  if (accountCode && ACCOUNT_BRANDINGS[accountCode]) {
    return ACCOUNT_BRANDINGS[accountCode];
  }

  return null;
};

