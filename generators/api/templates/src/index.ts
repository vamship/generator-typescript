/**
 * @module app
 */
import loggerProvider from '@vamship/logger';
import express from 'express';
import dotenv from 'dotenv';

if (!dotenv.config()) {
    throw new Error('Unable to initialize environment configuration');
}

const logger = loggerProvider
    .configure('<%= projectName %>', {
        extreme: process.env.EXTREME_LOGGING === 'true',
        level: process.env.LOG_LEVEL || 'info'
    })
    .getLogger('main');

logger.trace('Logger initialized');

// ---------- Application Initialization ----------
import routes from './routes';

logger.trace('Initializing application');
const app = express();

logger.trace('Registering routes and handlers');
routes.setup(app);

// ---------- Start web server ----------
logger.trace('Extracting port from environment');

const port = parseInt(process.env.PORT || '');
logger.info({ port }, 'Port configuration');

logger.trace('Launching web server');
app.listen(port, () => {
    logger.info({ port }, 'Server started');
});
