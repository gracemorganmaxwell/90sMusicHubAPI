const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAllAlbums);
router.post('/', albumController.createAlbum);
router.get('/:albumId', albumController.getAlbumById);
router.put('/:albumId', albumController.updateAlbum);
router.delete('/:albumId', albumController.deleteAlbum);

module.exports = router;
