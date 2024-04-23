const express = require("express");
const router = express.Router();
const { Playlists, Catalogs } = require("../models");
const upload = require("../middleware/Upload");

router.get("/", async (req, res) => {
    try {
        const allPlaylists = await Playlists.findAll();
        res.json(allPlaylists);
    } catch (error) {
        console.error("Ошибка при получении всех плейлистов:", error);
        res.status(500).json({ error: "Не удалось получить список плейлистов" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const catalogPlaylist = await Catalogs.findAll({ where: { PlaylistId: id } });     
        res.json(catalogPlaylist);
    } catch (error) {
        console.error("Ошибка при получении плейлиста по ID:", error);
        res.status(500).json({ error: "Не удалось найти плейлист" });
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file;

        if (!title) {
            return res.status(400).json({ error: "Необходимо название" });
        }

        const newPlaylist = {
            title: title,
            description: description,
            image: imageUrl.filename,
        };

        const addedPlaylist = await Playlists.create(newPlaylist);
        res.status(201).json(addedPlaylist);
    } catch (error) {
        console.error("Ошибка при добавлении плейлиста:", error);
        res.status(500).json({ error: "Не удалось добавить плейлист" });
    }
});

module.exports = router;
