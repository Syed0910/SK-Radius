const { sequelize } = require('../config/database');
const Feature = require('./Feature');
const Tax = require('./Tax');
const Package = require('./Package');
const PackageFeature = require('./PackageFeature');

// Define associations
Package.belongsTo(Tax, { foreignKey: 'tax_id', as: 'tax' });
Tax.hasMany(Package, { foreignKey: 'tax_id', as: 'packages' });

Package.hasMany(PackageFeature, { foreignKey: 'package_id', as: 'package_features' });
PackageFeature.belongsTo(Package, { foreignKey: 'package_id', as: 'package' });

Feature.hasMany(PackageFeature, { foreignKey: 'feature_id', as: 'package_features' });
PackageFeature.belongsTo(Feature, { foreignKey: 'feature_id', as: 'feature' });

// We can also define a Many-to-Many association directly for easier querying
Package.belongsToMany(Feature, {
  through: PackageFeature,
  foreignKey: 'package_id',
  otherKey: 'feature_id',
  as: 'features'
});

Feature.belongsToMany(Package, {
  through: PackageFeature,
  foreignKey: 'feature_id',
  otherKey: 'package_id',
  as: 'packages'
});

module.exports = {
  sequelize,
  Feature,
  Tax,
  Package,
  PackageFeature
};
