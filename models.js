const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/plantr', {logging: true});


db.authenticate()
  .then( () => console.log('connected to the database')   )

  module.exports = db;

const Gardener = db.define('gardener', {
  name: {type: Sequelize.STRING},
  age: {type: Sequelize.INTEGER},
});

const Plot = db.define('plot', {
  size: {type: Sequelize.INTEGER},
  shaded: {type: Sequelize.BOOLEAN}
});

const Vegetable = db.define('vegetable', {
  name: {type: Sequelize.STRING},
  color: {type: Sequelize.STRING},
  planted_on: {type: Sequelize.DATE}
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});
//The "through" parameter defines the name of the join table that gets created.

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

