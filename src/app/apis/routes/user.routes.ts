import express from 'express';
import { createSuperAdminController } from '../super-admin/controllers/create.super.admin.controller'

const router = express.Router();

router.get('/', createSuperAdminController);

export default router;