import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getBrandingForAccount } from '../services/brandingService';
import { applyBranding, resetBranding } from '../utils/applyBranding';
import { DEFAULT_BRANDING } from '../config/defaultBranding';

const BrandingContext = createContext();

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};

export const BrandingProvider = ({ children }) => {
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAccountId, setCurrentAccountId] = useState(null);

  /**
   * Loads branding for a given account
   * @param {Object} account - Account object with id and code
   */
  const loadBranding = useCallback(async (account) => {
    if (!account) {
      // Reset to default if no account
      setBranding(DEFAULT_BRANDING);
      applyBranding(DEFAULT_BRANDING);
      setCurrentAccountId(null);
      return;
    }

    // Skip if already loaded for this account
    if (currentAccountId === account.id && branding.id !== DEFAULT_BRANDING.id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const brandingConfig = await getBrandingForAccount(account);
      
      if (brandingConfig) {
        setBranding(brandingConfig);
        applyBranding(brandingConfig);
        setCurrentAccountId(account.id);
      } else {
        // Fallback to default
        setBranding(DEFAULT_BRANDING);
        applyBranding(DEFAULT_BRANDING);
        setCurrentAccountId(null);
      }
    } catch (err) {
      console.error('Error loading branding:', err);
      setError(err.message);
      // Fallback to default on error
      setBranding(DEFAULT_BRANDING);
      applyBranding(DEFAULT_BRANDING);
      setCurrentAccountId(null);
    } finally {
      setLoading(false);
    }
  }, [currentAccountId, branding.id]);

  /**
   * Applies a branding configuration directly
   * @param {Object} brandingConfig - Branding configuration object
   */
  const applyBrandingConfig = useCallback((brandingConfig) => {
    if (brandingConfig) {
      setBranding(brandingConfig);
      applyBranding(brandingConfig);
    }
  }, []);

  /**
   * Resets branding to default
   */
  const resetToDefault = useCallback(() => {
    setBranding(DEFAULT_BRANDING);
    applyBranding(DEFAULT_BRANDING);
    resetBranding();
    setCurrentAccountId(null);
  }, []);

  // Apply default branding on mount
  useEffect(() => {
    applyBranding(DEFAULT_BRANDING);
  }, []);

  const value = {
    branding,
    loading,
    error,
    loadBranding,
    applyBrandingConfig,
    resetToDefault,
    currentAccountId,
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
};

