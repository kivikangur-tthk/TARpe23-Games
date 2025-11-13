import GamesController from "../controllers/GamesController.js";

export default (app) => {
    app.route('/api/v1/games')
        .get(GamesController.getAll)
        .post(GamesController.create);
    app.route('/api/v1/games/:id')
        .get(GamesController.getById)
        .put(GamesController.updateById)
        .delete(GamesController.deleteById);
}
