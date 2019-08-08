import Sequelize from 'sequelize';
import configurations from "../config";

const env = process.env.NODE_ENV || 'development';
const config = configurations[env];

let sequelize;

if (env !== 'development') {
    sequelize = new Sequelize(config.url)
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect
    });
}


export default sequelize;

