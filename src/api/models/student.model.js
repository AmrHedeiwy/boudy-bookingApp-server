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
 * @typedef {Object} User
 * @property {number} UserID - The unique ID of the user.
 * @property {string} Firstname - The first name of the user. Must be
   between 2 and 30 letters only.
 * @property {string} Lastname - The last name of the user. Must be
   between 2 and 30 letters only.
 * @property {string} Username - The username of the user. Must be 
   between 3 and 20 letters, digits, underscores, or hyphens.
 * @property {string} Userkey - The unique key generated for user
   using ../services/hooks.
 * @property {string} Email - The email address of the user. Must be
   unique and in valid email format.
 * @property {string} Password - The password of the user. Must be
   at least 8 characters long and contain at least one uppercase letter,
   one lowercase letter, one digit, and one special character from
   the set @$!%?&.
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
      PhoneNumber: {
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
