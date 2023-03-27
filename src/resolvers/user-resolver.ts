import bcrypt from 'bcrypt'
import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { User } from '../dto/model/user-model';
import { UserTvShow } from '../dto/model/user-tv-show.model';
import { ErrorMessage } from '../utils/error-message';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
  ): Promise<User> {

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error(ErrorMessage.USER_ALREADY_EXISTS);
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

  @Mutation(() => UserTvShow)
  async addFavorite(
    @Arg('userId') userId: string,
    @Arg('tvShowId') tvShowId: string) : Promise<UserTvShow> {
    const userTvShow = new UserTvShow({ userId, tvShowId });
    await userTvShow.save();
    return userTvShow
  }

  @Mutation(() => Boolean)
  async removeFavorite(@Arg('userId') userId: string,
    @Arg('tvShowId') tvShowId: string): Promise<Boolean> {
    const userTvShow = await UserTvShow.findOne({ where: { userId, tvShowId } });

    if (!userTvShow) {
      throw new Error(ErrorMessage.FAVORITE_USER_SHOW_DOESNT_EXIST);
    }

    await userTvShow.destroy();
    return true;
  }
}