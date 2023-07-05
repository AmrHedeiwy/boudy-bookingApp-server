import { Model } from 'sequelize';

/**
 * Defines the Subject model.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The data types module.
 * @returns {Teacher} The initalized model.
 */
export default (sequelize, DataTypes) => {
  /**
 * @class Teacher
 * @classdesc A Sequelize model representing a teacher.
 * @extends Model
 * 
 * @typedef {Object} Teacher
 * @property {number} UserID - The unique ID of the teacher.
 * @property {string} Firstname - The first name of the user. Must be
   between 2 and 30 letters only.
 * @property {string} Lastname - The last name of the user. Must be
   between 2 and 30 letters only.
 * @property {string} Email - The email address of the user. Must be
   unique and in valid email format.
 * @property {string} Phone - The phone number of the teacher.
 */
  class Teacher extends Model {}

  Teacher.init(
    {
      TeacherID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[A-Za-z]{2,30}$/
        }
      },
      Lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[A-Za-z]{2,30}$/
        }
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          isLowercase: true
        }
      },
      Phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Teacher',
      tableName: 'teachers',
      timestamps: false
    }
  );
  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Subject, {
      through: 'TeacherSubject',
      foreignKey: 'TeacherID'
    });
    Teacher.belongsToMany(models.Level, {
      through: 'TeacherLevel',
      foreignKey: 'TeacherID'
    });
  };
  return Teacher;
};
