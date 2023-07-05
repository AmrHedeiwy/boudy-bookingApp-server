import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Importing the sequelize instnace.
import db from './api/models/index.js';

app.get('/', (req, res) => {
  res.json('hello!');
});

/**
 * Setup the PostgreSQL database and start the server.
 *
 * @function main
 */
async function main() {
  // Synchronizing the databsae tables with the models
  await db.sequelize.sync({ force: true });
  // Starting the server and listening on specifed port

  // BELLOW CODE FOR TESTING
  const levels = await db.Level.bulkCreate([
    { Name: 'OL' },
    { Name: 'AS' },
    { Name: 'A2' }
  ]);
  const subjects = await db.Subject.bulkCreate([
    { Name: 'Math' },
    { Name: 'English' },
    { Name: 'Chemistry' }
  ]);

  for (const level of levels) {
    for (const subject of subjects) {
      await level.addSubject(subject);
    }
  }

  const subjectName = 'Math';
  const levelName = 'AS';
  const teacher = await db.Teacher.create({
    Firstname: 'amr',
    Lastname: 'Hedeiwy',
    Email: 'amr.hedewy@gmail.com',
    PhoneNumber: '0120322132'
  });

  const level = await db.Level.findOne({ where: { Name: levelName } });
  const subject = await db.Subject.findOne({ where: { Name: subjectName } });

  await teacher.addLevel(level);
  await teacher.addSubject(subject);
  // ABOVE CODE FOR TESTING

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

main();
