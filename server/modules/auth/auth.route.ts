import express from 'express';
import { registerSchema, loginSchema } from './auth.schema';
import { validator } from '../../utils/validator';
import * as controller from './auth.controller';

const router = express.Router();

router.post('/register', validator(registerSchema), controller.registerCtrl);
router.post('/login', validator(loginSchema), controller.login);
router.post('/refresh-token', controller.refreshToken);
export default router;
