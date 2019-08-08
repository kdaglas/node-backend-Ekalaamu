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
    firstname: {
      type: STRING,
      allowNull: false
    },
    lastname: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      validate: {
        isEmail: { args: true, msg: "Provide a valid email." }
      }
    },
    password: {
      type: STRING,
      validate: {
        len: { args: [8], msg: "Password should be a minimum of 8 characters." }
      }
    },
    verified: {
      type: BOOLEAN,
      defaultValue: false
    }
  },
  {
    hooks: {
      afterValidate: user => {
        user.id = bcrypt.hashSync(user.email, 8);
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  }
);

