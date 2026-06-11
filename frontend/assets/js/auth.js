/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Auth State Manager
 *  frontend/assets/js/auth.js
 * ============================================================
 *  Handles login, logout, register, and auth state across pages.
 * ============================================================
 */

'use strict';

const Auth = (() => {
  // ── State ──────────────────────────────────────────────────
  let _user  = Storage.get(CONFIG.STORAGE_KEYS.USER);
  let _token = Storage.get(CONFIG.STORAGE_KEYS.TOKEN);

  // ── Getters ────────────────────────────────────────────────
  const isLoggedIn = ()   => Boolean(_token && _user);
  const getUser    = ()   => _user;
  const getToken   = ()   => _token;
  const isAdmin    = ()   => _user?.role === 'admin';
  const isInstructor = () => _user?.role === 'instructor' || isAdmin();

  // ── Persist session ────────────────────────────────────────
  const _persist = (token, user) => {
    _token = token;
    _user  = user;
    Storage.set(CONFIG.STORAGE_KEYS.TOKEN, token);
    Storage.set(CONFIG.STORAGE_KEYS.USER,  user);
  };

  const _clear = () => {
    _token = null;
    _user  = null;
    Storage.remove(CONFIG.STORAGE_KEYS.TOKEN);
    Storage.remove(CONFIG.STORAGE_KEYS.USER);
  };

  // ── Register ───────────────────────────────────────────────
  const register = async ({ firstName, lastName, email, password }) => {
    const data = await Api.post('/auth/register', { firstName, lastName, email, password });
    _persist(data.token, data.data.user);
    return data.data.user;
  };

  // ── Login ──────────────────────────────────────────────────
  const login = async ({ email, password }) => {
    const data = await Api.post('/auth/login', { email, password });
    _persist(data.token, data.data.user);
    return data.data.user;
  };

  // ── Logout ─────────────────────────────────────────────────
  const logout = async () => {
    try { await Api.post('/auth/logout', {}); } catch {}
    _clear();
    Router.navigate('/');
  };

  // ── Refresh user from API ──────────────────────────────────
  const refreshUser = async () => {
    if (!isLoggedIn()) return null;
    try {
      const data = await Api.get('/auth/me');
      _user = data.data.user;
      Storage.set(CONFIG.STORAGE_KEYS.USER, _user);
      return _user;
    } catch {
      _clear();
      return null;
    }
  };

  // ── Route guard ────────────────────────────────────────────
  const requireAuth = (redirectTo = '/login') => {
    if (!isLoggedIn()) Router.navigate(redirectTo);
  };

  const requireGuest = (redirectTo = null) => {
    if (isLoggedIn()) Router.navigate(redirectTo || (isAdmin() ? '/admin' : '/'));
  };

  return {
    isLoggedIn, getUser, getToken, isAdmin, isInstructor,
    register, login, logout, refreshUser, requireAuth, requireGuest,
  };
})();

window.Auth = Auth;
