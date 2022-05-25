require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({

    host: "localhost",
    user: "root",
    password: process.env.mysql_pswd,
    database: "groupomania",
    dialect: "mysql"
});

  const db = {};
try {
  db;
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;