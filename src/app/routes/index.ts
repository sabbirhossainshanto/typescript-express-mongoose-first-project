import { Router } from 'express';
import { moduleRoutes } from './moduleRoute';

const router = Router();
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
