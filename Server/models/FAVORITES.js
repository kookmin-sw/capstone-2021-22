const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FAVORITES', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "즐겨찾기 고유번호"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "유저 고유번호",
      references: {
        model: 'USERS',
        key: 'id'
      }
    },
    pill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "알약 고유번호",
      references: {
        model: 'PILLS',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'FAVORITES',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_FAVORITES_user_id_USERS_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_FAVORITES_pill_id_PILLS_id",
        using: "BTREE",
        fields: [
          { name: "pill_id" },
        ]
      },
    ]
  });
};
