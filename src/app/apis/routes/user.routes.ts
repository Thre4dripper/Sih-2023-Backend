import express from 'express';
import { createSuperAdminController } from '../super-admin/controllers/create.super.admin.controller'

const router = express.Router();

router.post('/api/v1/create-super-admin', createSuperAdminController);

export default router;