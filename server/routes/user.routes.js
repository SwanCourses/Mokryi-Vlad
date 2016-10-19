import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.post('/users/registration', UserController.create);
  router.get('/users/profile', protectedMiddleware, UserController.profile);
  router.put('/users/profile', protectedMiddleware, UserController.update);
  return router;
};
