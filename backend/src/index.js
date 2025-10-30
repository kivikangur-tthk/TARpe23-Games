import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { sync } from './data/dbConfig.js';
import { userService } from './data/userService.js';
import { gameService} from "./data/gameService.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };

dotenv.config();

const app = express();
app.use(express.json());
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (req, res) => {
    const user = await userService.getUser("Tiit");
    res.status(200).type('text/plain').send(`Hello, ${user.username}!`);
});

app.get('/api/v1/games/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const game = await gameService.getGame(req.params.id);
    if (!game) {
        return res.status(404).send({ error: "Game not found" });
    }
    return res.json(game);
});

app.get('/api/v1/games', async (req, res) => {
    const games =await gameService.getGames();
    return res.json(games);
});

app.post('/api/v1/games', async (req, res) => {
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
});

app.delete('/api/v1/games/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const gameDeleted = await gameService.deleteGame(req.params.id);
    if (!gameDeleted) {
        return res.status(404).send({ error: "Game not found" });
    }
    return res.status(204).send();
});

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    await sync();
    await userService.createUser("Tiit", "pass");
    console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };