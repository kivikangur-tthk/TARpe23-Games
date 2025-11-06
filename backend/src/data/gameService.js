import { db } from "./dbConfig.js";
export const gameService = {
    getGame: async (gameId) => {
        const game = await db.Games.findByPk(gameId,{
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        return game ? game.get({ plain: true }) : undefined;
    },
    getGames: async () => {
        const games = await db.Games.findAll({
            attributes: ['id', 'name'],
        });
        return games.map(g=>g.get({ plain: true }));
    },
    createGame: async (name, developer, releaseDate, price) => {
        const createdGame = await db.Games.create({
            name,
            developer,
            releaseDate,
            price
        });
        return createdGame.get({ plain: true });
    },
    async deleteGame(gameId) {
        const deleteResult = await db.Games.destroy({
            where: {
                id: gameId,
            },
        });
        return deleteResult !== 0;
    }
}