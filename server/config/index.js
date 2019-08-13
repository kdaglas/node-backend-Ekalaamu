import dotenv from 'dotenv';

dotenv.config();

const baseConfig = {
    dialect: 'postgres'
};

const configurations = {
    development: Object.assign({},
      baseConfig,
      {
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE,
          port: process.env.DATABASE_PORT,
          host: process.env.DATABASE_HOST,
      }
      ),
    test: Object.assign({},
      baseConfig,
      {
          url: process.env.TEST_DB_URL
      }
      ),
    production: Object.assign({}, baseConfig, {
        url: process.env.PROD_DB_URL
    })
};

export default configurations;
