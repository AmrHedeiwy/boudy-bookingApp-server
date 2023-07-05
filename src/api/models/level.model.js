import { Model } from 'sequelize';

/**
 * Defines the Subject model.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The data types module.
 * @returns {Level} The initalized model.
 */
export default (sequelize, DataTypes) => {
  /**
   * @class Level
   * @classdesc A Sequelize model representing a subject.
   * @extends Model
   *
   * @typedef {Object} Level
   * @property {number} LevelID - The unique ID of the level.
   * @property {string} Name - The level name.
   */
  class Level extends Model {}

  Level.init(
    {
      LevelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Level',
      tableName: 'levels',
      timestamps: false
    }
  );
  Level.associate = (models) => {
    Level.belongsToMany(models.Subject, {
      through: 'SubjectLevel',
      foreignKey: 'LevelID'
    });
    Level.belongsToMany(models.Teacher, {
      through: 'TeacherLevel',
      foreignKey: 'LevelID'
    });
  };
  return Level;
};
