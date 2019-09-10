import AuthController from '../controllers/user/auth';

export const userRoutes = router => {

  router.route("/signup").post(AuthController.signUp),
  router.route("/login").post(AuthController.login)

}