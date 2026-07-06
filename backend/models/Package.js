const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Tax = require('./Tax');

const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  package_type: {
    type: DataTypes.ENUM('cloud', 'on_premise'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  tax_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    references: {
      model: Tax,
      key: 'id'
    }
  },
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'half_yearly', 'yearly'),
    defaultValue: 'monthly',
  },
  short_description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  is_popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sort_order: {
    type: DataTypes.SMALLINT.UNSIGNED,
    defaultValue: 0,
  }
}, {
  tableName: 'packages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['slug', 'package_type', 'billing_cycle'], name: 'uq_package' },
    { fields: ['package_type'], name: 'idx_package_type' },
    { fields: ['is_active'], name: 'idx_active' },
    { fields: ['sort_order'], name: 'idx_sort' },
    { fields: ['tax_id'], name: 'idx_tax_id' }
  ]
});

module.exports = Package;
