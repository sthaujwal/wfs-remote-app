/**
 * Branding Application Utility
 * Applies branding configuration to the DOM (CSS variables, fonts, logos, etc.)
 */

/**
 * Applies branding configuration to the document
 * @param {Object} branding - Branding configuration object
 */
export const applyBranding = (branding) => {
  if (!branding) return;

  const root = document.documentElement;

  // Apply color CSS variables
  if (branding.colors) {
    root.style.setProperty('--theme-primary', branding.colors.primary);
    root.style.setProperty('--theme-secondary', branding.colors.secondary);
    root.style.setProperty('--theme-primary-dark', branding.colors.primaryDark || branding.colors.primary);
    root.style.setProperty('--theme-primary-hover', branding.colors.primaryHover || branding.colors.primary);
    root.style.setProperty('--theme-background', branding.colors.background);
    root.style.setProperty('--theme-background-gradient', branding.colors.backgroundGradient);
    root.style.setProperty('--theme-surface', branding.colors.surface);
    root.style.setProperty('--theme-text-primary', branding.colors.textPrimary);
    root.style.setProperty('--theme-text-secondary', branding.colors.textSecondary);
    root.style.setProperty('--theme-border', branding.colors.border);
    root.style.setProperty('--theme-success', branding.colors.success);
    root.style.setProperty('--theme-warning', branding.colors.warning);
    root.style.setProperty('--theme-error', branding.colors.error);
    root.style.setProperty('--theme-info', branding.colors.info);

    // Additional color mappings for backward compatibility
    if (branding.colors.gold) {
      root.style.setProperty('--theme-gold', branding.colors.gold);
    }
    if (branding.colors.blue) {
      root.style.setProperty('--theme-blue', branding.colors.blue);
    }
    if (branding.colors.gray) {
      root.style.setProperty('--theme-gray', branding.colors.gray);
    }
  }

  // Apply font CSS variables
  if (branding.fonts) {
    root.style.setProperty('--theme-font-primary', branding.fonts.primary);
    root.style.setProperty('--theme-font-body', branding.fonts.body);
  }

  // Apply component-specific CSS variables
  if (branding.components) {
    if (branding.components.button) {
      root.style.setProperty('--theme-button-border-radius', branding.components.button.borderRadius);
      root.style.setProperty('--theme-button-shadow', branding.components.button.shadow);
      if (branding.components.button.gradient) {
        root.style.setProperty('--theme-button-gradient', branding.components.button.gradient);
      }
    }
    if (branding.components.card) {
      root.style.setProperty('--theme-card-border-radius', branding.components.card.borderRadius);
      root.style.setProperty('--theme-card-shadow', branding.components.card.shadow);
    }
    if (branding.components.input) {
      root.style.setProperty('--theme-input-border-radius', branding.components.input.borderRadius);
      root.style.setProperty('--theme-input-focus-ring', branding.components.input.focusRing);
    }
  }

  // Apply fonts (Google Fonts)
  if (branding.fonts?.googleFontsUrl) {
    applyGoogleFonts(branding.fonts.googleFontsUrl);
  }

  // Apply logos
  if (branding.logos) {
    applyLogos(branding.logos);
  }

  // Apply metadata (title, favicon, etc.)
  if (branding.metadata) {
    applyMetadata(branding.metadata);
  }

  // Update body background
  if (branding.colors?.backgroundGradient) {
    document.body.style.background = branding.colors.backgroundGradient;
    document.body.style.backgroundAttachment = 'fixed';
  } else if (branding.colors?.background) {
    document.body.style.background = branding.colors.background;
  }
};

/**
 * Applies Google Fonts to the document
 * @param {string} fontUrl - Google Fonts URL
 */
const applyGoogleFonts = (fontUrl) => {
  // Remove existing Google Fonts link if any
  const existingLink = document.querySelector('link[data-google-fonts]');
  if (existingLink) {
    existingLink.remove();
  }

  // Create new link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;
  link.setAttribute('data-google-fonts', 'true');
  document.head.appendChild(link);
};

/**
 * Applies logos to the document
 * @param {Object} logos - Logo configuration object
 */
const applyLogos = (logos) => {
  // Update favicon
  if (logos.favicon) {
    const existingFavicon = document.querySelector("link[rel='icon']");
    if (existingFavicon) {
      existingFavicon.href = logos.favicon;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = logos.favicon;
      document.head.appendChild(link);
    }
  }

  // Store logo URLs in data attributes for component access
  if (logos.main) {
    document.documentElement.setAttribute('data-logo-main', logos.main);
  }
  if (logos.loginLogo) {
    document.documentElement.setAttribute('data-logo-login', logos.loginLogo);
  }
  if (logos.sidebarLogo) {
    document.documentElement.setAttribute('data-logo-sidebar', logos.sidebarLogo);
  }
};

/**
 * Applies metadata to the document
 * @param {Object} metadata - Metadata configuration object
 */
const applyMetadata = (metadata) => {
  // Update page title
  if (metadata.appName) {
    document.title = metadata.appName;
  }

  // Store metadata in data attributes for component access
  if (metadata.footerText) {
    document.documentElement.setAttribute('data-footer-text', metadata.footerText);
  }
  if (metadata.loginTitle) {
    document.documentElement.setAttribute('data-login-title', metadata.loginTitle);
  }
};

/**
 * Resets branding to default
 */
export const resetBranding = () => {
  const root = document.documentElement;
  
  // Remove all theme CSS variables
  const themeVars = [
    '--theme-primary',
    '--theme-secondary',
    '--theme-primary-dark',
    '--theme-primary-hover',
    '--theme-background',
    '--theme-background-gradient',
    '--theme-surface',
    '--theme-text-primary',
    '--theme-text-secondary',
    '--theme-border',
    '--theme-success',
    '--theme-warning',
    '--theme-error',
    '--theme-info',
    '--theme-font-primary',
    '--theme-font-body',
    '--theme-button-border-radius',
    '--theme-button-shadow',
    '--theme-button-gradient',
    '--theme-card-border-radius',
    '--theme-card-shadow',
    '--theme-input-border-radius',
    '--theme-input-focus-ring',
  ];

  themeVars.forEach(varName => {
    root.style.removeProperty(varName);
  });

  // Reset body background
  document.body.style.background = '';
  document.body.style.backgroundAttachment = '';
}

