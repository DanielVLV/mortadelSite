const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Cart, { foreignKey: 'userId' });
      this.hasMany(models.Favourites, { foreignKey: 'userId' });
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
