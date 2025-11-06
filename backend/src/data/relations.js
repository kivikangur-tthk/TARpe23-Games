export default (db) => {
    db.Games.belongsToMany(db.Users, { through: db.GamePlays, as: "Players"});
    db.Users.belongsToMany(db.Games, { through: db.GamePlays});
}

