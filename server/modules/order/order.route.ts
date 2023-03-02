import express from 'express';
import passport from 'passport';
import { validator } from '../../utils/validator';
import { createOrderSchema } from './order.schema';

import * as controller from './order.controller';

const router = express.Router();

router.post('/', validator(createOrderSchema), controller.createCrl);

router.get('/', controller.getAllCtrl);

router.get('/:id', controller.getOneByIdCtrl);

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.destroyCtrl);

router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.updateCtrl);

export default router;
