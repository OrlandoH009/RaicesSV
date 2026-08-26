const express = require('express');
const router = express.Router();

const requireApiAuth = require('../middleware/auth.apiGuard');
const upload = require('../middleware/upload.publications.middleware');

const listPublications = require('../business/publication.list');
const getPublication = require('../business/publication.get');
const createPublication = require('../business/publication.create');
const updatePublication = require('../business/publication.update');
const deletePublication = require('../business/publication.delete');
const toggleLikePublication = require('../business/publication.like');

router.get('/api/publications', listPublications);
router.get('/api/publications/:id', getPublication);

router.post('/api/publications', requireApiAuth, upload.single('image'), createPublication);
router.put('/api/publications/:id', requireApiAuth, upload.single('image'), updatePublication);
router.delete('/api/publications/:id', requireApiAuth, deletePublication);
router.post('/api/publications/:id/like', requireApiAuth, toggleLikePublication);

module.exports = router;