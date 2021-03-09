var DataTypes = require("sequelize").DataTypes;
var _FAVORITES = require("./FAVORITES");
var _PILLS = require("./PILLS");
var _USERS = require("./USERS");

function initModels(sequelize) {
  var FAVORITES = _FAVORITES(sequelize, DataTypes);
  var PILLS = _PILLS(sequelize, DataTypes);
  var USERS = _USERS(sequelize, DataTypes);

  FAVORITES.belongsTo(PILLS, { as: "pill", foreignKey: "pill_id"});
  PILLS.hasMany(FAVORITES, { as: "FAVORITEs", foreignKey: "pill_id"});
  FAVORITES.belongsTo(USERS, { as: "user", foreignKey: "user_id"});
  USERS.hasMany(FAVORITES, { as: "FAVORITEs", foreignKey: "user_id"});

  return {
    FAVORITES,
    PILLS,
    USERS,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
