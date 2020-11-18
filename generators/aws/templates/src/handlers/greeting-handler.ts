import {
    argValidator as _argValidator,
    schemaHelper as _schemaHelper,
} from '@vamship/arg-utils';
import _schema from '../schema/greeting-handler-schema.json';
const _schemaChecker = _schemaHelper.createSchemaChecker(_schema);
import { IContext, IExt, IGreetingInput, Languages } from '../types';

/**
 * Deletes an entity record of the given cluster, and removes the standard secret
 * stores from Knox.
 *
 * @param {Object} event The lambda event object
 * @param {Object} context The lambda context object
 * @param {Object} ext Extended properties containing references to injected
 *        properties such as config, logger, etc.
 */
export const handler = (
    event: IGreetingInput,
    context: IContext,
    ext: IExt
) => {
    const { logger, config, alias } = ext;

    logger.trace({ alias, config }, 'Executing lambda handler');

    logger.info('Performing schema validation');
    _schemaChecker(event, true);

    logger.info('Schema validation successful');
    logger.trace({ event }, 'Handler input');

    const { name, language } = event;

    let messageName = name;
    if (!_argValidator.checkString(name, 1)) {
        messageName = 'there';
    }

    const greeting = language === Languages.ENGLISH? 'Hello': 'Bonjour';

    return {
        message: `${greeting}, ${messageName}`,
    };
};

export default handler;
