import {sequelize} from "./dbConfig.js";
import {DataTypes} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const Games = sequelize.define(
    "Game",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        developer: {
            type: DataTypes.STRING,
        },
        releaseDate: {
            type: DataTypes.DATE,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // 99 999 999.99
        }
    }
);

if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    if (process.env.DB_SEED === "true") {
        await Games.findOrCreate({
            where: {name: "Minecraft"},
            defaults: {
                name: "Minecraft",
                developer: "Mojang",
                releaseDate: new Date("2011-11-18T00:00:00.000Z"),
                price: "29.99"
            },
        });
    }
}

export default Games;