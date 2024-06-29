const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/', playlistController.getAllPlaylists);
router.post('/', playlistController.createPlaylist);
router.get('/:playlistId', playlistController.getPlaylistById);
router.put('/:playlistId', playlistController.updatePlaylist);
router.delete('/:playlistId', playlistController.deletePlaylist);

module.exports = router;
