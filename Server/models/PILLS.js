const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PILLS', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "알약 고유번호"
    },
    class: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "분류명"
    },
    shape: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "제형코드명"
    },
    company: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "제조\/수입사 이름"
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "알약 이름"
    }
  }, {
    sequelize,
    tableName: 'PILLS',
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
    ]
  });
};
