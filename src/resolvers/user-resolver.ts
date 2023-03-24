import bcrypt from 'bcrypt'
import { Arg, Mutation, Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../dto/model/user-model';
import { Context } from '../types/context';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async userString () {
    return 'Teste'
  }
  
  @Mutation(() => User)
  async registerUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
  ): Promise<User> {

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await user.save();

    return user;
  }
}