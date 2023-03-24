import { Request } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../dto/model/user-model';

export interface Context {
  db: Sequelize;
  req: Request;
  user: User
}