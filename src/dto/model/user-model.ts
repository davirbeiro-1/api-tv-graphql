import { BelongsToMany, Column, Model, Table, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';
import { TvShow } from './tv-show.model';
import { UserTvShow } from './user-tv-show.model';

@Table
@ObjectType()
export class User extends Model{
  @Field(() => ID)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Unique
  @Column
  email: string;

  @Field()
  @Column
  password: string;

  @Field()
  @Column
  name: string;

  @BelongsToMany(() => TvShow, () => UserTvShow)
  tvShows: TvShow[];

  @Field(() => Date)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}