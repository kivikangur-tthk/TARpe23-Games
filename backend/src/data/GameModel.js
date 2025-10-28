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
        }
    }
);
console.log("SYNC", process.env.DB_SYNC==="true");
if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    console.log("SEED",process.env.DB_SEED === "true")
    if (process.env.DB_SEED === "true") {
        await Games.findOrCreate({
            where: { name: "Minecraft" },
            defaults: { name: "Minecraft" },
        });
    }
}

export default Games;