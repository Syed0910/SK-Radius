const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Package = require('./Package');
const Feature = require('./Feature');

const PackageFeature = sequelize.define('PackageFeature', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  package_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Package,
      key: 'id'
    }
  },
  feature_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Feature,
      key: 'id'
    }
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'package_features',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // only created_at is present in DDL
  indexes: [
    { unique: true, fields: ['package_id', 'feature_id'], name: 'uq_package_feature' },
    { fields: ['package_id'], name: 'idx_package_id' },
    { fields: ['feature_id'], name: 'idx_feature_id' }
  ]
});

module.exports = PackageFeature;
