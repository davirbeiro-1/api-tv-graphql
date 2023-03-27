import { Sequelize } from 'sequelize-typescript';
import { models } from './utils/models';

export const sequelize = new Sequelize({
  database: 'tekever',
  username: 'root',
  password: '123456',
  dialect: 'mysql',
  models
});