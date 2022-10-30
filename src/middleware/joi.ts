import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { UserType } from '../../typings';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            console.log(error)
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
  user: {
    create: Joi.object<UserType>({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      scores: Joi.array<number>()
    }),
    update: Joi.object<UserType>({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      scores: Joi.array<number>()
    })
  }
}