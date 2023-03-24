import { Sequelize } from 'sequelize-typescript';
import { Actor } from './src/dto/model/actor.model';
import { Episode } from './src/dto/model/episode.model';
import { TvShowActor } from './src/dto/model/tv-show-actor.model';
import { TvShow } from './src/dto/model/tv-show.model';
import { User } from './src/dto/model/user-model';

export const sequelize = new Sequelize({
  database: 'tekever',
  username: 'root',
  password: '123456',
  dialect: 'mysql',
  models: [User, TvShow, Episode, Actor, TvShowActor],
});