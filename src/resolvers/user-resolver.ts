import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "../dto/input/create-user-input";
import { UserModel } from "../dto/models/user-model";

@Resolver()
export class UserResolver {

    @Query(() => String!)
    async getUser() {
        return 'Usuario Joaquim'
    }

    @Mutation(()=> UserModel)
    async createUser(@Arg('data')data: CreateUserInput) {
        const user = {
            name: data.name,
            password: data.password
        }
        return user
    }

}