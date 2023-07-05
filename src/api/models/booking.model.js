import { Model } from 'sequelize';

/**
 * Defines the Subject model.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The data types module.
 * @returns {Subject} The initalized model.
 */
export default (sequelize, DataTypes) => {
  /**
   * @class Subject
   * @classdesc A Sequelize model representing a subject.
   * @extends Model
   *
   * @typedef {Object} Booking
   * @property {number} BookingID - The unique ID of the booking.
   * @property {date} StartTime - The date the student's session starts.
   * @property {date} EndTime - The date the stdent's session ends.
   * @property {number} StudentID - The foreign key that refrences the student that
   * booked the subject.
   * @property {number} TeacherID - The foreign key that refrences the teacher that
   * the student booked with.
   * @property {number} SubjectID - The foreign key that refrences the subject that
   * the student booked for.
   * @property {number} LevelID - The foreign key that refrences the level that
   * the student chose.
   */
  class Booking extends Model {}

  Booking.init(
    {
      BookingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      StartTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      EndTime: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      timestamps: false
    }
  );
  Booking.associate = (model) => {
    Booking.belongsTo(model.Student, { foreignKey: 'StudentID' });
    Booking.belongsTo(model.Teacher, { foreignKey: 'TeacherID' });
    Booking.belongsTo(model.Subject, { foreignKey: 'SubjectID' });
    Booking.belongsTo(model.Level, { foreignKey: 'LevelID' });
  };

  return Booking;
};
