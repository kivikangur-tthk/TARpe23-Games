import Games from "./GameModel.js";
export const gameService = {
    getGame: async (gameId) => {
        const game = await Games.findByPk(gameId,{
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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