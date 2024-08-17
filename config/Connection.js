import { Sequelize } from 'sequelize'
import config from 'dotenv'
config();

const Connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
});

export default Connection