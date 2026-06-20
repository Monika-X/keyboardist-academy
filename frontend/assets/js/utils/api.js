/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — API Client Utility
 *  frontend/assets/js/utils/api.js
 * ============================================================
 *  Thin wrapper around fetch() with:
 *  - Automatic auth header injection
 *  - JSON serialisation / deserialisation
 *  - Unified error handling
 *  - Request timeout
 * ============================================================
 */

'use strict';

const Api = (() => {
  /**
   * Core request function.
   * @param {string} endpoint  – relative path, e.g. '/auth/login'
   * @param {object} [options] – fetch options override
   * @returns {Promise<any>}   – parsed JSON response
   */
  const request = async (endpoint, options = {}) => {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;

    // Build headers
    const isFormData = options.body instanceof FormData;
    const headers = { ...options.headers };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    const token   = Storage.get(CONFIG.STORAGE_KEYS.TOKEN);
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Timeout via AbortController
    // Allow options.timeout to override default. If 0, bypass timeout.
    // Default to a longer timeout (60000ms) for FormData if not explicitly provided.
    const timeoutDuration = options.timeout !== undefined ? options.timeout : (isFormData ? 60000 : CONFIG.API_TIMEOUT);
    
    const controller = new AbortController();
    let timer;
    if (timeoutDuration > 0) {
      timer = setTimeout(() => controller.abort(), timeoutDuration);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal     : controller.signal,
        credentials: 'include',
        body       : options.body ? (isFormData ? options.body : JSON.stringify(options.body)) : undefined,
      });

      if (timer) clearTimeout(timer);

      // Parse response safely
      let data = null;
      try {
        data = await response.json();
      } catch (parseError) {
        data = null;
      }

      if (!response.ok) {
        const message = data?.message || data?.error || `HTTP error ${response.status}`;
        throw new ApiError(message, response.status, data);
      }

      return data;

    } catch (err) {
      if (timer) clearTimeout(timer);
      if (err.name === 'AbortError') {
        throw new ApiError('Request timed out. Please check your connection.', 408);
      }
      throw err;
    }
  };

  return {
    get   : (endpoint, opts = {})         => request(endpoint, { method: 'GET',    ...opts }),
    post  : (endpoint, body, opts = {})   => request(endpoint, { method: 'POST',   body, ...opts }),
    patch : (endpoint, body, opts = {})   => request(endpoint, { method: 'PATCH',  body, ...opts }),
    put   : (endpoint, body, opts = {})   => request(endpoint, { method: 'PUT',    body, ...opts }),
    delete: (endpoint, opts = {})         => request(endpoint, { method: 'DELETE', ...opts }),
    uploadFile: async (file) => {
      if (!file) {
        console.error('No file selected for upload');
        return { success: false, message: 'No file provided for upload' };
      }
      console.log('File selected for upload:', file.name);
      
      const formData = new FormData();
      formData.append('image', file);
      console.log('Upload started. FormData created for Cloudinary upload');
      
      try {
        // Disable timeout for large image uploads (timeout: 0)
        const response = await request('/upload', { method: 'POST', body: formData, timeout: 0 });
        
        if (!response || response.success !== true) {
          console.error('Upload response indicated failure:', response);
          return { success: false, message: response?.message || 'Upload failed' };
        }
        
        console.log('Upload success response received:', response);
        return response;
      } catch (err) {
        console.error('Upload failed with exception:', err);
        return { success: false, message: err.message || 'Upload failed' };
      }
    },
  };
})();

// ── Custom API Error class ────────────────────────────────────
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name   = 'ApiError';
    this.status = status;
    this.data   = data;
  }
}

window.Api      = Api;
window.ApiError = ApiError;
