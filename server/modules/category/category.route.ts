import express from 'express';
import passport from 'passport';
import { validator } from '../../utils/validator';
import { createCategorySchema } from './category.schema';

import * as controller from './category.controller';

const router = express.Router();

router.post(
    '/category',
    passport.authenticate('jwt', { session: false }),
    validator(createCategorySchema),
    controller.createCrl
);

router.get('/category', controller.getAllCtrl);

router.get('/category/:id', controller.getOneByIdCtrl);

router.delete('/category/:id', passport.authenticate('jwt', { session: false }), controller.destroyCtrl);

router.patch('/category/:id', passport.authenticate('jwt', { session: false }), controller.updateCtrl);

router.patch('/category-delete-multi', passport.authenticate('jwt', { session: false }), controller.deleteMultiCtrl);

router.patch('/category-restore-multi', passport.authenticate('jwt', { session: false }), controller.restoreMultiCtrl);

router.patch(
    '/category-delete-multi-trash',
    passport.authenticate('jwt', { session: false }),
    controller.deleteMultiTrashCtrl
);

export default router;
