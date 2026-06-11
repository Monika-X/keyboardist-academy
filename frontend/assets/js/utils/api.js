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
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    const token   = Storage.get(CONFIG.STORAGE_KEYS.TOKEN);
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Timeout via AbortController
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal     : controller.signal,
        credentials: 'include',
        body       : options.body ? JSON.stringify(options.body) : undefined,
      });

      clearTimeout(timer);

      // Parse response
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data?.message || data?.error || `HTTP error ${response.status}`;
        throw new ApiError(message, response.status, data);
      }

      return data;

    } catch (err) {
      clearTimeout(timer);
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
