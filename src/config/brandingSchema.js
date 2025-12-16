/**
 * Branding Configuration Schema
 * Defines the structure for whitelabel branding configurations
 */

/**
 * @typedef {Object} BrandingColors
 * @property {string} primary - Primary brand color (hex)
 * @property {string} secondary - Secondary brand color (hex)
 * @property {string} primaryDark - Dark variant of primary color
 * @property {string} primaryHover - Hover state of primary color
 * @property {string} background - Main background color
 * @property {string} backgroundGradient - Background gradient (CSS gradient string)
 * @property {string} surface - Surface/card background color
 * @property {string} textPrimary - Primary text color
 * @property {string} textSecondary - Secondary text color
 * @property {string} border - Default border color
 * @property {string} success - Success state color
 * @property {string} warning - Warning state color
 * @property {string} error - Error state color
 * @property {string} info - Info state color
 */

/**
 * @typedef {Object} BrandingFonts
 * @property {string} primary - Primary font family (for headings)
 * @property {string} body - Body font family
 * @property {string} googleFontsUrl - Google Fonts import URL (optional)
 */

/**
 * @typedef {Object} BrandingLogos
 * @property {string} main - Main logo URL/path
 * @property {string} favicon - Favicon URL/path
 * @property {string} loginLogo - Login page logo (optional)
 * @property {string} sidebarLogo - Sidebar logo (optional)
 */

/**
 * @typedef {Object} ComponentStyles
 * @property {Object} button - Button component styles
 * @property {string} button.borderRadius - Button border radius
 * @property {string} button.shadow - Button shadow
 * @property {string} button.gradient - Button gradient (optional)
 * @property {Object} card - Card component styles
 * @property {string} card.borderRadius - Card border radius
 * @property {string} card.shadow - Card shadow
 * @property {Object} input - Input component styles
 * @property {string} input.borderRadius - Input border radius
 * @property {string} input.focusRing - Focus ring color
 */

/**
 * @typedef {Object} BrandingConfig
 * @property {string} id - Unique branding identifier
 * @property {string} name - Display name for the branding
 * @property {BrandingColors} colors - Color palette
 * @property {BrandingFonts} fonts - Font configuration
 * @property {BrandingLogos} logos - Logo URLs/paths
 * @property {ComponentStyles} components - Component-specific styles
 * @property {Object} metadata - Additional metadata
 * @property {string} metadata.appName - Application name
 * @property {string} metadata.footerText - Footer copyright text
 * @property {string} metadata.loginTitle - Login page title (optional)
 */

/**
 * Default branding configuration structure
 */
export const BRANDING_SCHEMA = {
  id: '',
  name: '',
  colors: {
    primary: '',
    secondary: '',
    primaryDark: '',
    primaryHover: '',
    background: '',
    backgroundGradient: '',
    surface: '',
    textPrimary: '',
    textSecondary: '',
    border: '',
    success: '',
    warning: '',
    error: '',
    info: '',
  },
  fonts: {
    primary: '',
    body: '',
    googleFontsUrl: '',
  },
  logos: {
    main: '',
    favicon: '',
    loginLogo: '',
    sidebarLogo: '',
  },
  components: {
    button: {
      borderRadius: '',
      shadow: '',
      gradient: '',
    },
    card: {
      borderRadius: '',
      shadow: '',
    },
    input: {
      borderRadius: '',
      focusRing: '',
    },
  },
  metadata: {
    appName: '',
    footerText: '',
    loginTitle: '',
  },
};

/**
 * Validates a branding configuration against the schema
 * @param {BrandingConfig} config - Branding configuration to validate
 * @returns {boolean} - True if valid
 */
export const validateBrandingConfig = (config) => {
  if (!config || typeof config !== 'object') return false;
  if (!config.id || !config.name) return false;
  if (!config.colors || !config.fonts || !config.logos) return false;
  return true;
};

/**
 * Merges a partial branding config with defaults
 * @param {Partial<BrandingConfig>} partial - Partial branding config
 * @param {BrandingConfig} defaults - Default branding config
 * @returns {BrandingConfig} - Merged branding config
 */
export const mergeBrandingConfig = (partial, defaults) => {
  return {
    ...defaults,
    ...partial,
    colors: {
      ...defaults.colors,
      ...(partial.colors || {}),
    },
    fonts: {
      ...defaults.fonts,
      ...(partial.fonts || {}),
    },
    logos: {
      ...defaults.logos,
      ...(partial.logos || {}),
    },
    components: {
      ...defaults.components,
      ...(partial.components || {}),
      button: {
        ...defaults.components?.button,
        ...(partial.components?.button || {}),
      },
      card: {
        ...defaults.components?.card,
        ...(partial.components?.card || {}),
      },
      input: {
        ...defaults.components?.input,
        ...(partial.components?.input || {}),
      },
    },
    metadata: {
      ...defaults.metadata,
      ...(partial.metadata || {}),
    },
  };
};

