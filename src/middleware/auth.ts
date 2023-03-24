import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/context';
import jwt from 'jsonwebtoken';
import { User } from '../dto/model/user-model';

export const addAuthMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decodedToken.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Not authorized');
    }

    context.user = user;
  } catch (err) {
    throw new Error('Not authorized');
  }

  return next();
};