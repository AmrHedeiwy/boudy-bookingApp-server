import { Model } from 'sequelize';

/**
 * Defines the Subject model.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The data types module.
 * @returns {User} The initalized model.
 */
export default (sequelize, DataTypes) => {
  /**
   * @class Subject
   * @classdesc A Sequelize model representing a subject.
   * @extends Model
   *
   * @typedef {Object} Subject
   * @property {number} UserID - The unique ID of the subject.
   * @property {string} Name - The name of the subject.
   */
  class Subject extends Model {}

  Subject.init(
    {
      SubjectID: {
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
      modelName: 'Subject',
      tableName: 'subjects',
      timestamps: false
    }
  );
  Subject.associate = (models) => {
    Subject.belongsToMany(models.Teacher, {
      through: 'TeacherSubject',
      foreignKey: 'SubjectID'
    });
    Subject.belongsToMany(models.Level, {
      through: 'SubjectLevel',
      foreignKey: 'SubjectID'
    });
  };
  return Subject;
};
