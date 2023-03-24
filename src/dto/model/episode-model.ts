import { Column, Model, Table} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

@Table
@ObjectType()
export class Episode extends Model{
  @Field(() => ID)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;


  @Field()
  @Column
  name: string;

  @Field()
  @Column
  isReleased: boolean;

  @Field()
  @Column
  releaseDate: string;

  @Field()
  @Column
  duration: string;

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