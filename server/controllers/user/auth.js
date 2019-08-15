import { Op } from "sequelize";

import { User } from "../../models/user";
import { Actions } from "../../helpers/actions";
import { signToken } from "../../helpers/jwt";
import bcrypt from "bcrypt";
import {validationResult} from "express-validator";


const op = Op;

export default class AuthController {

    static signUp = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { email, firstName, lastName, password } = req.body;
        if(Object.keys(req.body).find(key => req.body[key] === '')) {
            return res.status(422).send({ errors: `${req.body[key]} field is empty` });
        }
        const data = { email, strategy: 'local', firstName, lastName, password };
        User.findAll({
            where: {
                email: {
                    [op.and]: [data.email]
                }
            }
        })
          .then(async result => {
                if (result.length) {
                    return res.status(400).json({ errors: ['Email already in use.'] });
                }

                const userData = await Actions.addData(User, data, [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "strategy",
                    "password"
                ]);
                return res.status(201).send({ user: userData.email, token: signToken(userData.id) })
            }
          )
          .catch( err => {
              console.log(err)
          })

    };


    static login = (req, res) => {
        const { password } = req.body;
        if (Object.keys(req.body).find(key => req.body[key] === '')) {
            return res.status(422).send({ errors: `${req.body[key]} field is empty` });
        }

        User.findOne({
            where: {
                email: req.body.email,
                strategy: 'local'
            }
        }).then( result => {
            if (!result) {
                return res.status(404).send({ errors: "User doesn't exist or email is invalid" })
            }
            console.log(result.dataValues.password);
            bcrypt.compare(password, result.dataValues.password, (error, result) => result
              ? res.status(200).json({success: "Successfully logged in", token: signToken(result.id)})
              : res.status(404).send({ errors: "Password and email do not match for this user" })
            )
        }).catch( error => console.log(error));
    };

    static googleAuth = (req, res) => {
        console.log(req.user);
        return res.status(201).send(req.user);
    };

    static facebookAuth = (req, res) => {
        return res.status(201).send(req.user);
    };

    static linkedInAuth = (req, res) => {
        return res.status(201).send(req.user);
    };

    static twitterAuth = (req, res) => {
        return res.status(201).send(req.user);
    };
}
