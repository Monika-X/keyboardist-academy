/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Client-Side Validator
 *  frontend/assets/js/utils/validator.js
 * ============================================================
 */

'use strict';

const Validator = (() => {
  const rules = {
    required  : (v)       => v !== '' && v !== null && v !== undefined,
    email     : (v)       => /^\S+@\S+\.\S+$/.test(v),
    minLength : (v, n)    => String(v).length >= n,
    maxLength : (v, n)    => String(v).length <= n,
    password  : (v)       => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
    phone     : (v)       => /^[+]?[\d\s\-().]{7,20}$/.test(v),
    url       : (v)       => { try { new URL(v); return true; } catch { return false; } },
    number    : (v)       => !isNaN(Number(v)),
    min       : (v, n)    => Number(v) >= n,
    max       : (v, n)    => Number(v) <= n,
    match     : (v, other) => v === other,
  };

  const messages = {
    required  : 'This field is required.',
    email     : 'Please enter a valid email address.',
    minLength : (n) => `Must be at least ${n} characters.`,
    maxLength : (n) => `Must be no more than ${n} characters.`,
    password  : 'Password must be 8+ characters with at least one uppercase letter and one number.',
    phone     : 'Please enter a valid phone number.',
    url       : 'Please enter a valid URL.',
    number    : 'Please enter a valid number.',
    min       : (n) => `Must be at least ${n}.`,
    max       : (n) => `Must be no more than ${n}.`,
    match     : 'Fields do not match.',
  };

  /**
   * Validate a form field value.
   * @param {any}    value
   * @param {object} fieldRules  – e.g. { required: true, email: true, minLength: 8 }
   * @returns {{ valid: boolean, error: string|null }}
   */
  const validate = (value, fieldRules) => {
    for (const [rule, arg] of Object.entries(fieldRules)) {
      if (!rules[rule]) continue;
      const ok = typeof arg === 'boolean' ? rules[rule](value) : rules[rule](value, arg);
      if (!ok) {
        const msg = typeof messages[rule] === 'function' ? messages[rule](arg) : messages[rule];
        return { valid: false, error: msg };
      }
    }
    return { valid: true, error: null };
  };

  /**
   * Validate an entire form object.
   * @param {object} formData   – { fieldName: value }
   * @param {object} schema     – { fieldName: ruleObject }
   * @returns {{ valid: boolean, errors: object }}
   */
  const validateForm = (formData, schema) => {
    const errors = {};
    let   valid  = true;
    for (const [field, fieldRules] of Object.entries(schema)) {
      const result = validate(formData[field] ?? '', fieldRules);
      if (!result.valid) { errors[field] = result.error; valid = false; }
    }
    return { valid, errors };
  };

  return { validate, validateForm };
})();

window.Validator = Validator;
