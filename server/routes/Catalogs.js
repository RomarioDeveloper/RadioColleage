const express = require("express");
const router = express.Router();
const { Catalogs } = require("../models");
const upload = require("../middleware/Upload");

router.get("/", async (req, res) => {
    try {
        const catalog = await Catalogs.findAll();
        res.json(catalog);
    } catch (error) {
        console.error("Ошибка при получении каталога:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

router.post("/", upload.fields([{ name: "audio", maxCount: 1 }, { name: "image", maxCount: 1 }]), async (req, res) => {
    try {
        const { title, author, PlaylistId } = req.body;
        const imageUrl = req.files["image"] ? req.files["image"][0] : null;
        const audioUrl = req.files["audio"] ? req.files["audio"][0] : null;

        if (!audioUrl) {
            return res.status(400).json({ error: "Необходимы изображение и аудиофайл" });
        }

        const newSong = {
            title: title,
            author: author,
            audio: audioUrl.filename,
            image: imageUrl.filename,
            PlaylistId: PlaylistId,
        };

        const addedSong = await Catalogs.create(newSong);
        res.status(201).json(addedSong);
    } catch (error) {
        console.error("Ошибка при добавлении песни:", error);
        res.status(500).json({ error: "Не удалось добавить песню" });
    }
});

module.exports = router;
