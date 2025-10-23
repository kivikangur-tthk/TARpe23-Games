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
    }
}