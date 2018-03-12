const db = require('./models');

db.sync({force: true})
  .then (() => {
    console.log('Database synced!');
    db.close();
  })
  .catch(err => {
    console.log("Something went wrong");
    console.log(err);
    db.close();
  })
