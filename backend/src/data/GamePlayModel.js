export default (sequelize, DataTypes) => {
    return sequelize.define(
        "GamePlay",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            playTimeMinutes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
}

