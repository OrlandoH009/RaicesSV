const express = require('express');
const router = express.Router();

const requireAdminApiAuth = require('../middleware/auth.adminApiGuard');
const adminService = require('../business/admin.server');

const handle = (fn) => async (req, res) => {
    try {
        const result = await fn(req, res);
        res.status(200).json(result);
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo completar la acción. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).json({ message: safeMessage });
    }
};

const getAppBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

router.get('/api/admin/users', requireAdminApiAuth, handle(async () => {
    const users = await adminService.listUsers();
    return { users };
}));

router.get('/api/admin/metrics', requireAdminApiAuth, handle(async () => {
    const metrics = await adminService.getDashboardMetrics();
    return metrics;
}));


router.patch('/api/admin/users/:id/status', requireAdminApiAuth, handle(async (req) => {
    const user = await adminService.setUserStatus(req.params.id, req.session.user, {
        status: req.body.status
    });
    return { user };
}));


router.patch('/api/admin/users/:id/promote', requireAdminApiAuth, handle(async (req) => {
    const result = await adminService.promoteToAdmin(req.params.id, req.session.user, {
        appBaseUrl: getAppBaseUrl(req)
    });
    return result;
}));


router.patch('/api/admin/users/:id/demote', requireAdminApiAuth, handle(async (req) => {
    const user = await adminService.demoteAdminToUser(req.params.id, req.session.user);
    return { user };
}));

router.delete('/api/admin/users/:id', requireAdminApiAuth, handle(async (req) => {
    await adminService.deleteAdmin(req.params.id, req.session.user);
    return { deleted: true };
}));


router.post('/api/admin/users', requireAdminApiAuth, handle(async (req) => {
    const user = await adminService.createAdmin(req.body.name, req.body.email, req.body.password);
    return { user };
}));

module.exports = router;