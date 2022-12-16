import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default registerAs('database', () => {
  const db: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: process.env.DB_CHARSET,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    dropSchema: process.env.DB_DROP_SCHEMA === 'true' ? true : false,
    migrationsRun: process.env.DB_RUN_MIGRATIONS === 'true' ? true : false,
    entities: [],
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    extra: {
      connectionLimit: Number(process.env.DB_CONNECTIONLIMIT),
    },
  };

  const schema = Joi.object({
    type: Joi.string().required().valid('mysql'),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required().allow('', null),
    charset: Joi.string().required(),
    database: Joi.string().required(),
    synchronize: Joi.boolean().required(),
    dropSchema: Joi.boolean().required(),
    migrationsRun: Joi.boolean().required(),
    entities: Joi.array().required(),
    logging: Joi.boolean().required(),
    extra: {
      connectionLimit: Joi.number().required(),
    },
  });

  // Validates our values using the schema.
  // Passing a flag to tell Joi to not stop validation on the
  // first error, we want all the errors found.
  const { error } = schema.validate(db, { abortEarly: false });

  // If the validation is invalid, "error" is assigned a
  // ValidationError object providing more information.
  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }
  return db;
});
