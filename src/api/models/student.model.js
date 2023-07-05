import { Model } from 'sequelize';

/**
 * Defines the Student model.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The data types module.
 * @returns {Student} The initalized model.
 */
export default (sequelize, DataTypes) => {
  /**
 * @class Student
 * @classdesc A Sequelize model representing a student.
 * @extends Model
 * 
 * @typedef {Object} Student
 * @property {number} StudentID - The unique ID of the student.
 * @property {string} Firstname - The first name of the student. Must be
   between 2 and 30 letters only.
 * @property {string} Lastname - The last name of the student. Must be
   between 2 and 30 letters only.
 * @property {string} Phone - The phone number of the student.
 */
  class Student extends Model {}

  Student.init(
    {
      StudentID: {
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
      Phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
      timestamps: false
    }
  );

  Student.associate = (models) => {
    Student.hasMany(models.Booking);
  };
  return Student;
};
