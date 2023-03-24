import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Actor } from './actor.model';
import { TvShow } from './tv-show.model';

@Table
export class TvShowActor extends Model {

  @ForeignKey(() => TvShow)
  @Column
  tvShowId: number;

  @ForeignKey(() => Actor)
  @Column
  actorId: number;
}