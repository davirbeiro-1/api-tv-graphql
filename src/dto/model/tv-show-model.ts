import { Column, Model, Table, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

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
  description: string;

  @Field(() => Date)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}