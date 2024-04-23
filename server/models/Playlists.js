module.exports = (sequelize, DataTypes) => {
    const Playlists = sequelize.define("Playlists", {
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, { timestamps: false });

    Playlists.associate = (models) => {
        Playlists.hasMany(models.Catalogs, {
            onDelete: "cascade",
            optional: true,
            constraints: false,
           
        });
    };
    return Playlists;
};