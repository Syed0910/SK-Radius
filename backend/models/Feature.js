const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Feature = sequelize.define('Feature', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: 'uq_feature_code'
  },
  feature_type: {
    type: DataTypes.ENUM('boolean', 'price', 'limit', 'text'),
    defaultValue: 'text',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  tableName: 'features',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['is_active'], name: 'idx_feature_active' },
    { fields: ['sort_order'], name: 'idx_feature_sort' }
  ]
});

module.exports = Feature;
