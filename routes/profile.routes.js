const express = require('express');
const router = express.Router();

const requireApiAuth = require('../middleware/auth.apiGuard');
const upload = require('../middleware/upload.middleware');

const getProfile = require('../business/profile.get');
const updateProfile = require('../business/profile.update');
const deleteProfile = require('../business/profile.delete');
const { uploadAvatar, useGoogleAvatar } = require('../business/profile.avatar');

router.get('/api/profile', requireApiAuth, getProfile);
router.put('/api/profile', requireApiAuth, updateProfile);
router.delete('/api/profile', requireApiAuth, deleteProfile);

router.post('/api/profile/avatar', requireApiAuth, upload.single('avatar'), uploadAvatar);
router.post('/api/profile/avatar/google', requireApiAuth, useGoogleAvatar);

module.exports = router;