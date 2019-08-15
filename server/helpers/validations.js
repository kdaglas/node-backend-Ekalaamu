import { body } from "express-validator";

export default class Validations {

    static signUpValidations = () => (
      [
          body('email', 'Provide a valid email').exists().isEmail(),
          body('firstName', 'First Name is required').exists(),
          body('lastName', 'Last Name is required').exists(),
          body('password', 'Password is required').exists(),
          body('password', 'Password should be a minimum of 8 characters').isLength({ min: 8 })
      ]
    );

}
