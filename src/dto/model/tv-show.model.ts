import { BelongsToMany, Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';
import { Actor } from './actor.model';
import { Episode } from './episode.model';
import { TvShowActor } from './tv-show-actor.model';
import { User } from './user-model';
import { UserTvShow } from './user-tv-show.model';

@Table
@ObjectType()
export class TvShow extends Model{

  @Field(() => ID)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  name: string;

  @Field()
  @Column
  startsAt: string;

  @Field()
  @Column
  endsAt: string;

  @Field()
  @Column
  numberOfEpisodes: string;

  @Field()
  @Column
  numberOfSeasons: string;

  @Field()
  @Column
  genre: String

  @Field()
  @Column
  plataformToWatch: String

  @Field()
  @Column
  description: string;

  @HasMany(() => Episode)
  episodes: Episode[];

  @BelongsToMany(() => Actor, () => TvShowActor)
  actors: Actor[];
  
  @BelongsToMany(() => User, () => UserTvShow)
  users: User[];

  @Field(() => Date)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}