import AuthController from '../controllers/user/auth';
import passport from 'passport';
import Validations from "../helpers/validations";
const passportGoogle = passport.authenticate('googleToken',{ session: false});
const passportFacebook = passport.authenticate('facebookToken', { session: false});
const passportLinkedIn = passport.authenticate('linkedInToken', { session: false });
const passportTwitter = passport.authenticate('twitterToken', {session: false});

export const userRoutes = router => {

  router.route("/signup").post(Validations.signUpValidations(), AuthController.signUp);
  router.route("/login").post(AuthController.login);
  router.route("/google").post(passportGoogle, AuthController.googleAuth);
  router.route("/facebook").post(passportFacebook, AuthController.facebookAuth);
  router.route("/twitter").post(passportTwitter, AuthController.twitterAuth);
  router.route("/linkedin").post(passportLinkedIn, AuthController.linkedInAuth);

};
