import bcrypt from "bcrypt";
import connection from "./index";
import {BOOLEAN, STRING} from "sequelize";
export const User = connection.define(
  "User",
  {
      id: {
          type: STRING,
          primaryKey: true
      },
      strategy: {
          type: STRING,
          allowNull: false
      },
      firstName: {
          type: STRING,
          allowNull: false
      },
      lastName: {
          type: STRING,
          allowNull: false
      },
      email: {
          type: STRING,
          allowNull: true
      },
      password: {
          type: STRING,
          allowNull: true
      },
      verified: {
          type: BOOLEAN,
          defaultValue: false
      }
  },
  {
      hooks: {
          afterValidate: user => {
              user.id = user.strategy === 'local'
                ? bcrypt.hashSync(user.email, 8)
                : user.socialId;
              user.password = bcrypt.hashSync(user.password, 8);
          }
      }
  }
);

