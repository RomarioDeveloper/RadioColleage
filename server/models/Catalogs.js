module.exports = (sequelize, DataTypes) => {
    const Catalogs = sequelize.define("Catalogs", {
        audio: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, { timestamps: false });
    return Catalogs;
};