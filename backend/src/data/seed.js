export default async (db) => {
    await db.Games.findOrCreate({
        where: {name: "Minecraft"},
        defaults: {
            name: "Minecraft",
            developer: "Mojang",
            releaseDate: new Date("2011-11-18T00:00:00.000Z"),
            price: "29.99"
        },
    });
}