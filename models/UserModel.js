import { DataTypes } from "sequelize";
import Connection from '../config/Connection.js';

const UserModel = Connection.define(
    'UserModel',
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    },
    {
        tableName: 'users',
    }
);

UserModel.associate = function(models) {
    UserModel.hasMany(models.MusicModel, {as: 'musics'})
};

export default UserModel;