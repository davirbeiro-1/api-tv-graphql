import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../dto/model/user-model';
import { LoginResponse } from '../dto/model/login.model';

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid login credentials');
    }

    const accessToken = sign({ userId: user.id }, 'abc', {
      expiresIn: '1d',
    });

    return { accessToken, user };
  }
}