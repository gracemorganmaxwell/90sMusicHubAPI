const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.get("/", albumController.getAllAlbums);
router.post("/", albumController.createAlbum);
router.get("/:id", albumController.getAlbumById); // Changed to :id to match the yaml file
router.put("/:id", albumController.updateAlbum); // Changed to :id to match the yaml file
router.delete("/:id", albumController.deleteAlbum); // Changed to :id to match the yaml file

module.exports = router;
