import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Field, ID, ObjectType } from "type-graphql";
import { TvShow } from "./tv-show.model";
import { User } from "./user-model";

@Table
@ObjectType()
export class UserTvShow extends Model {
  @ForeignKey(() => User)
  @Column
  @Field(() => ID)
  userId: string;

  @ForeignKey(() => TvShow)
  @Column
  @Field(() => ID)
  tvShowId: string;
}