import { Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';
import { TvShow } from './tv-show.model';
import { Actor } from './actor.model';

@Table
@ObjectType()
export class TvShowActor extends Model {
  @Field(() => ID)
  @Column
  @ForeignKey(() => Actor)
  actorId!: number;

  @Field(() => ID)
  @Column
  @ForeignKey(() => TvShow)
  tvShowId!: number;

  @BelongsTo(() => Actor)
  actor!: Actor;

  @BelongsTo(() => TvShow)
  tvShow!: TvShow;
}