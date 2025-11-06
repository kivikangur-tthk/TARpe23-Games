import { db } from "./dbConfig.js";
const { Games, Users } = db;
export const gameService = {
    getGame: async (gameId) => {
        const game = await Games.findOne({
            where: {
                id: gameId
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Users,
                as: "Players"
            }
        });
        return game ? game.get({ plain: true }) : undefined;
    },
    getGames: async () => {
        const games = await Games.findAll({
            attributes: ['id', 'name'],
        });
        return games.map(g=>g.get({ plain: true }));
    },
    createGame: async (name, developer, releaseDate, price) => {
        const createdGame = await Games.create({
            name,
            developer,
            releaseDate,
            price
        });
        return createdGame.get({ plain: true });
    },
    async deleteGame(gameId) {
        const deleteResult = await Games.destroy({
            where: {
                id: gameId,
            },
        });
        return deleteResult !== 0;
    }
}