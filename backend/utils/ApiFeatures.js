'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — API Features Utility
 *  backend/utils/ApiFeatures.js
 * ============================================================
 *  Provides chainable query helpers:
 *    - filter()   — field equality + comparison operators
 *    - sort()     — multi-field sorting
 *    - limitFields() — field projection
 *    - paginate() — page / limit–based pagination
 * ============================================================
 */

const { PAGINATION } = require('../config/constants');

class ApiFeatures {
  /**
   * @param {mongoose.Query} query    – Mongoose query object
   * @param {object}         queryStr – req.query from Express
   */
  constructor(query, queryStr) {
    this.query    = query;
    this.queryStr = queryStr;
  }

  /** Apply field-level filters, supporting gte, gt, lte, lt operators. */
  filter() {
    const queryObj = { ...this.queryStr };
    const excluded = ['page', 'sort', 'limit', 'fields', 'search'];
    excluded.forEach((f) => delete queryObj[f]);

    // Replace operators: gt → $gt, gte → $gte, etc.
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (m) => `$${m}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  /** Apply text search if a `search` query param is provided. */
  search(fields = []) {
    if (this.queryStr.search && fields.length) {
      const regex  = new RegExp(this.queryStr.search, 'i');
      const orCond = fields.map((f) => ({ [f]: regex }));
      this.query   = this.query.find({ $or: orCond });
    }
    return this;
  }

  /** Apply field sorting. Defaults to newest-first. */
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query   = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /** Restrict returned fields (projection). */
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query   = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /** Apply page/limit-based pagination. */
  paginate() {
    const page  = Math.max(1, parseInt(this.queryStr.page,  10) || PAGINATION.DEFAULT_PAGE);
    const limit = Math.min(
      PAGINATION.MAX_LIMIT,
      Math.max(1, parseInt(this.queryStr.limit, 10) || PAGINATION.DEFAULT_LIMIT)
    );
    const skip = (page - 1) * limit;

    this.query      = this.query.skip(skip).limit(limit);
    this.pagination = { page, limit, skip };
    return this;
  }
}

module.exports = ApiFeatures;
