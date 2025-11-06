export default (sequelize, DataTypes) => {
    return sequelize.define(
        "Game",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            developer: {
                type: DataTypes.STRING,
            },
            releaseDate: {
                type: DataTypes.DATE,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // 99 999 999.99
            }
        }
    );
}