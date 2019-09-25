module.exports = function(sequelize, DataTypes) {
    return sequelize.define('USERS', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        USERNAME: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false
        },
        PASSWORD: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        EMAIL: {
            type: DataTypes.STRING(55),
            allowNull: false
        },
        IS_ADMIN: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'USERS'
    });
};