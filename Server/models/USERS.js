const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USERS', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "유저 고유번호"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "유저 이름"
    },
    nick: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "유저 아이디"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "유저 비밀번호"
    }
  }, {
    sequelize,
    tableName: 'USERS',
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
