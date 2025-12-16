/**
 * Branding Service
 * Handles fetching branding configurations from the backend API
 */

import { DEFAULT_BRANDING } from '../config/defaultBranding';
import { validateBrandingConfig, mergeBrandingConfig } from '../config/brandingSchema';
import { getBrandingByAccount as getAccountBranding } from '../config/accountBrandings';

/**
 * Fetches branding configuration by account ID
 * @param {string} accountId - Account ID
 * @returns {Promise<Object>} - Branding configuration
 */
export const getBrandingByAccountId = async (accountId) => {
  try {
    // In a real application, this would be:
    // const response = await fetch(`/api/branding/account/${accountId}`);
    // if (!response.ok) throw new Error('Failed to fetch branding');
    // const branding = await response.json();

    // Get account code if available
    const accountCode = localStorage.getItem(`account-code-${accountId}`);
    
    // Get branding from account mappings
    const branding = getAccountBranding(accountId, accountCode);
    
    // Return branding or default
    return branding || DEFAULT_BRANDING;

  } catch (error) {
    console.error('Error fetching branding by account ID:', error);
    return DEFAULT_BRANDING;
  }
};

/**
 * Fetches branding configuration by account code
 * @param {string} accountCode - Account code (e.g., 'CBD-001', 'EIS-002')
 * @returns {Promise<Object>} - Branding configuration
 */
export const getBrandingByAccountCode = async (accountCode) => {
  if (!accountCode) return DEFAULT_BRANDING;

  try {
    // In a real application, this would be:
    // const response = await fetch(`/api/branding/account-code/${accountCode}`);
    // if (!response.ok) throw new Error('Failed to fetch branding');
    // const branding = await response.json();

    // Get branding from account mappings
    const branding = getAccountBranding(null, accountCode);
    
    // Return branding or default
    return branding || DEFAULT_BRANDING;

  } catch (error) {
    console.error('Error fetching branding by account code:', error);
    return DEFAULT_BRANDING;
  }
};

/**
 * Fetches branding configuration (tries account code first, then account ID)
 * @param {Object} account - Account object with id and code
 * @returns {Promise<Object>} - Branding configuration
 */
export const getBrandingForAccount = async (account) => {
  if (!account) return DEFAULT_BRANDING;

  // Store account code mapping for future lookups
  if (account.id && account.code) {
    localStorage.setItem(`account-code-${account.id}`, account.code);
  }

  // Check for admin-saved customizations first (these override account mappings)
  const storageKey = account.code 
    ? `branding-${account.code}` 
    : `branding-${account.id}`;
  const savedBranding = localStorage.getItem(storageKey);
  if (savedBranding) {
    try {
      const parsed = JSON.parse(savedBranding);
      if (validateBrandingConfig(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved branding, using account mapping');
    }
  }

  // Get branding from account mappings
  const branding = getAccountBranding(account.id, account.code);
  
  // Return branding or default
  return branding || DEFAULT_BRANDING;
};

/**
 * Preloads branding for multiple accounts
 * @param {Array<Object>} accounts - Array of account objects
 */
export const preloadBrandings = async (accounts) => {
  if (!accounts || !Array.isArray(accounts)) return;

  const promises = accounts.map(account => getBrandingForAccount(account));
  await Promise.all(promises);
};

/**
 * Saves branding configuration for an account
 * @param {Object} account - Account object with id and code
 * @param {Object} brandingConfig - Branding configuration to save
 * @returns {Promise<Object>} - Saved branding configuration
 */
export const saveBrandingForAccount = async (account, brandingConfig) => {
  if (!account || !brandingConfig) {
    throw new Error('Account and branding config are required');
  }

  try {
    // Validate the branding config
    if (!validateBrandingConfig(brandingConfig)) {
      throw new Error('Invalid branding configuration');
    }

    // Merge with defaults to ensure all fields are present
    const mergedConfig = mergeBrandingConfig(brandingConfig, DEFAULT_BRANDING);

    // In a real application, this would be:
    // const response = await fetch(`/api/branding/account/${account.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(mergedConfig)
    // });
    // if (!response.ok) throw new Error('Failed to save branding');
    // const savedBranding = await response.json();

    // For demo purposes, store in localStorage
    // This allows admins to override the default account mappings
    const storageKey = account.code 
      ? `branding-${account.code}` 
      : `branding-${account.id}`;
    
    localStorage.setItem(storageKey, JSON.stringify(mergedConfig));

    return mergedConfig;

  } catch (error) {
    console.error('Error saving branding:', error);
    throw error;
  }
};

