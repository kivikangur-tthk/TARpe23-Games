import {gameService} from "../data/gameService.js";

const getAll = async (req, res) => {
    const games =await gameService.getGames();
    return res.json(games);
}

const getById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const game = await gameService.getGame(req.params.id);
    if (!game) {
        return res.status(404).send({ error: "Game not found" });
    }
    return res.json(game);
}

const create = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Missing or empty required field: name" });
    }
    const releaseDate = Date.parse(req.body.releaseDate);
    if (req.body.releaseDate && isNaN(releaseDate)) {
        return res.status(400).send({ error: "Empty or malformed date string in field: releaseDate" });
    }
    const price = parseFloat(req.body.price);
    if (req.body.price && isNaN(price)) {
        return res.status(400).send({ error: "Malformed number string in field: price" });
    }
    const games = await gameService.createGame(req.body.name, req.body.developer, releaseDate, price);
    return res.json(games);
}

const updateById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const updatedGame = await gameService.updateGame(req.params.id, req.body);
    if (!updatedGame) {
        return res.status(404).send({ error: "Game not found" });
    }
    return res.json(updatedGame);
}

const deleteById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const gameDeleted = await gameService.deleteGame(req.params.id);
    if (!gameDeleted) {
        return res.status(404).send({ error: "Game not found" });
    }
    return res.status(204).send();
}

export default { getAll, getById, create, updateById, deleteById };

