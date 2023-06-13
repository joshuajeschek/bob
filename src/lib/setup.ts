process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-api/register';

import { config } from 'dotenv-cra';

config();
