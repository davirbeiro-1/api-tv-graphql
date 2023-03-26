import bcrypt from 'bcrypt'
import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { User } from '../dto/model/user-model';
import { UserTvShow } from '../dto/model/user-tv-show.model';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async userString() {
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

  @Mutation(() => UserTvShow)
  async addFavorite(
    @Arg('userId') userId: string,
    @Arg('tvShowId') tvShowId: string) : Promise<UserTvShow> {
    const userTvShow = new UserTvShow();
    userTvShow.userId = userId;
    userTvShow.tvShowId = tvShowId;
    const createdUserTvShow = await userTvShow.save();
    if (!createdUserTvShow) {
      throw new Error('Tv show can not be favorited')
    }
    return createdUserTvShow
  }

  @Mutation(() => Boolean)
  async removeFavorite(@Arg('userId') userId: string,
    @Arg('tvShowId') tvShowId: string): Promise<Boolean> {
    const userTvShow = await UserTvShow.findOne({ where: { userId, tvShowId } });
    if (!userTvShow) {
      throw new Error('User TV show not found');
    }
    await userTvShow.destroy();
    return true;
  }
}