/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Local Storage Utility
 *  frontend/assets/js/utils/storage.js
 * ============================================================
 */

'use strict';

const Storage = (() => {
  const get = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  };

  const set = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.warn('Storage.set failed:', e); }
  };

  const remove = (key) => { try { localStorage.removeItem(key); } catch {} };

  const clear  = ()    => { try { localStorage.clear(); }         catch {} };

  return { get, set, remove, clear };
})();

window.Storage = Storage;
