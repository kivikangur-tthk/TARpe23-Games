import {db} from "./dbConfig.js";

const {Games, Users} = db;
export const gameService = {
    getGame: async (gameId) => {
        const game = await Games.findOne({
            where: {
                id: gameId
            },
            include: {
                model: Users,
                as: "Players"
            }
        });
        return game ? game.get({plain: true}) : undefined;
    },
    getGames: async () => {
        const games = await Games.findAll({
            attributes: ['id', 'name', 'developer', 'price'],
        });
        return games.map(g => g.get({plain: true}));
    },
    createGame: async (name, developer, releaseDate, price) => {
        const createdGame = await Games.create({
            name,
            developer,
            releaseDate,
            price
        });
        return createdGame.get({plain: true});
    },
    updateGame: async (gameId, game) => {
        const [updatedCount, _ ] = await Games.update(game, {where: {id: gameId}});
        if (updatedCount > 0) {
            return await Games.findByPk(gameId);
        }
        return null;
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