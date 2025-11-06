export default async (db) => {
    const [minecraft, gameCreated] = await db.Games.findOrCreate({
        where: {name: "Minecraft"},
        defaults: {
            name: "Minecraft",
            developer: "Mojang",
            releaseDate: new Date("2011-11-18T00:00:00.000Z"),
            price: "29.99"
        },
    });
    console.log("Game created:", gameCreated);
    const [opilane, userCreated] = await db.Users.findOrCreate({
        where: {username: "opilane"},
        defaults: {
            username: "opilane",
            password: "$2a$10$OjEII2iqxMpjdd8kSEZty.ZNVVqLjm1YtHDWBpqxyMstdV09XlfSy"
        }
    });
    console.log("User created:", userCreated);
    const [gamePlay, gamePlayCreated] =await db.GamePlays.findOrCreate({
        where: { id: 1 },
        defaults: {
            GameId: minecraft.id,
            UserUsername: opilane.username,
            playTimeMinutes: 55,
        }
    });
    console.log("Game Play created:", gamePlayCreated);
    console.dir(gamePlay.get({plain:true}), {depth: null});
}