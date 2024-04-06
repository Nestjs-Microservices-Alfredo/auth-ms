import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars { 
    // PORT: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    NATS_SERVERS: string[];

}

const envVarsSchema = joi.object({
    // PORT: joi.number().required(),
    MONGO_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVarsConfig: EnvVars = envVars;

export const envs = {
    mongoUrl: envVarsConfig.MONGO_URL,
    jwt: envVarsConfig.JWT_SECRET,
    natsServers: envVarsConfig.NATS_SERVERS,
}