const Sequelize = require('sequelize')
require('dotenv/config')
const config = require('../config/config')
let sequelize

if(config.use_env_variable){
   sequelize = new Sequelize(config.use_env_variable, {
    dialect:  'postgres',
  });
}
else
{
   sequelize = new Sequelize(
    config.db.database,
    config.db.databaseUser,
    config.db.databasePassword,
  
    {
      dialect: 'postgres',
    },
  );

}

module.exports = sequelize;
