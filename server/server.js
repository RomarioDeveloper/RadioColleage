const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./models");
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/audios', express.static(path.join(__dirname, "uploads/audio")))
app.use('/images', express.static(path.join(__dirname, "uploads/images")))

const catalogRouter = require("./routes/Catalogs");
app.use("/catalogs", catalogRouter);

const playlistRouter = require("./routes/Playlists");
app.use("/playlists", playlistRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});