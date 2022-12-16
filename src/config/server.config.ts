import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
export default registerAs('server', () => {
  const server = {
    server_mode: process.env.SERVER_MODE,
    gateway_version: process.env.npm_package_version,
    server_port: process.env.SERVER_PORT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires: process.env.JWT_EXPIRES_IN,
    slack_webhook_url: process.env.SLACK_WEBHOOK_URL,
  };

  const schema = Joi.object({
    server_mode: Joi.string().required().valid('DEV', 'PROD', 'DEV_LOCAL', 'TEST', 'TESTING', 'SANDBOX'),
    gateway_version: Joi.string().required(),
    server_port: Joi.number().required(),
    jwt_secret: Joi.string().required(),
    jwt_expires: Joi.string().required(),
    slack_webhook_url: Joi.string().required(),
  });

  // Validates our values using the schema.
  // Passing a flag to tell Joi to not stop validation on the
  // first error, we want all the errors found.
  const { error } = schema.validate(server, { abortEarly: false });

  // If the validation is invalid, "error" is assigned a
  // ValidationError object providing more information.
  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }
  return server;
});
