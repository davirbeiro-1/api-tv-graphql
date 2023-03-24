import { Column, Model, Table} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

@Table
@ObjectType()
export class Actor extends Model{
  @Field(() => ID)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;


  @Field()
  @Column
  name: string;

  @Field()
  @Column
  age: string;

  // @Field()
  // @Column
  // appearances: string;

  @Field(() => Date)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}