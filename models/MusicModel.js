import { DataTypes } from "sequelize";
import Connection from '../config/Connection.js';
import UserModel from "./UserModel.js";

const MusicModel = Connection.define(
    'MusicModel',
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        tableName: 'musics',
    }
);

MusicModel.associate = function(models) {
    MusicModel.belongsTo(models.UserModel, {foreignKey: 'user_id', as: 'users'})
};

export default MusicModel;