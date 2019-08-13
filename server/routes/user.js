import AuthController from '../controllers/user/auth';
import passport from 'passport';
const passportGoogle = passport.authenticate('googleToken',{ session: false});
const passportFacebook = passport.authenticate('facebookToken', { session: false});
const passportLinkedIn = passport.authenticate('linkedInToken', { session: false });

export const userRoutes = router => {

  router.route("/signup").post(AuthController.signUp);
  router.route("/login").post(AuthController.login);
  router.route("/google").post(passportGoogle, AuthController.googleAuth);
  router.route("/facebook").post(passportFacebook, AuthController.facebookAuth);
  router.route("/linkedin").post(passportLinkedIn, AuthController.linkedInAuth);

};
