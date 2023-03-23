import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  name: String
  @Field()
  password: String
}