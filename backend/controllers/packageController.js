const { Package, Feature } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../config/database");

exports.createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, message: "Package created", data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating package", error: error.message });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", package_type } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE p.is_active = 1";
    const replacements = { limit: +limit, offset: +offset };

    if (package_type) {
      whereClause += " AND p.package_type = :package_type";
      replacements.package_type = package_type;
    }

    if (search) {
      whereClause += " AND (p.name LIKE :search OR p.slug LIKE :search)";
      replacements.search = `%${search}%`;
    }

    // Raw SQL to fetch packages, calculate taxes, and aggregate features
    const query = `
      SELECT 
        p.*,
        t.name AS tax_name,
        t.percentage AS tax_percentage,
        (p.price * IFNULL(t.percentage, 0)) / 100 AS tax_amount,
        p.price + ((p.price * IFNULL(t.percentage, 0)) / 100) AS total_amount,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', f.id, 
              'name', f.name, 
              'code', f.code, 
              'feature_type', f.feature_type, 
              'value', pf.value
            )
          )
          FROM package_features pf
          JOIN features f ON pf.feature_id = f.id
          WHERE pf.package_id = p.id
        ) as features
      FROM packages p
      LEFT JOIN taxes t ON p.tax_id = t.id
      ${whereClause}
      ORDER BY p.sort_order ASC, p.created_at DESC
      LIMIT :limit OFFSET :offset
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM packages p
      ${whereClause}
    `;

    const [packages] = await sequelize.query(query, { replacements });
    const [countResult] = await sequelize.query(countQuery, { replacements });
    const count = countResult[0].total;

    // Parse features JSON if it comes back as a string
    const formattedData = packages.map(pkg => {
      let parsedFeatures = [];
      if (pkg.features) {
        parsedFeatures = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features;
      }
      return {
        ...pkg,
        features: parsedFeatures
      };
    });

    res.json({ success: true, total: count, page: +page, data: formattedData });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, message: "Error fetching packages", error: error.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id, {
      include: [
        {
          model: Feature,
          as: 'features'
        }
      ]
    });
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    res.json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving package", error: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    await pkg.update(req.body);
    res.json({ success: true, message: "Package updated", data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating package", error: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });
    await pkg.destroy();
    res.json({ success: true, message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting package", error: error.message });
  }
};
