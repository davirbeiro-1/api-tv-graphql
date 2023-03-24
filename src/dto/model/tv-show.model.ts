import { BelongsToMany, Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';
import { GenreTvShow } from '../enum/genre-tv-show.enum';
import { PlataformToWatch } from '../enum/plataform-to-watch.enum';
import { Actor } from './actor.model';
import { Episode } from './episode.model';
// import { TvShowActor } from './tv-show-actor.model';

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

  @Column({
    type: DataType.ENUM(...Object.values(GenreTvShow)),
    defaultValue: GenreTvShow.OTHER,
  })
  genre: GenreTvShow

  @Column({
    type: DataType.ENUM(...Object.values(PlataformToWatch)),
    defaultValue: PlataformToWatch.OTHER,
  })
  plataformToWatch: PlataformToWatch

  @Field()
  @Column
  description: string;

  @HasMany(() => Episode)
  episodes: Episode[];

  // @BelongsToMany(() => Actor, () => TvShowActor)
  // actors: Actor[];

  @Field(() => Date)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}