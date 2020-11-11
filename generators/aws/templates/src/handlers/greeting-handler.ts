import {
    argValidator as _argValidator,
    schemaHelper as _schemaHelper
} from '@vamship/arg-utils';
import _schema from '../schema/greeting-handler-schema.json';
const _schemaChecker = _schemaHelper.createSchemaChecker(_schema);
import { IContext, IExt, IGreetingInput } from '../types/types';

/**
 * Deletes an entity record of the given cluster, and removes the standard secret
 * stores from Knox.
 *
 * @param {Object} event The lambda event object
 * @param {Object} context The lambda context object
 * @param {Object} ext Extended properties containing references to injected
 *        properties such as config, logger, etc.
 */
export const handler = (event: IRegisterClusterInput, context: IContext, ext: IExt) => {
    const { logger, config, alias } = ext;

    logger.trace('Executing lambda handler', { config, alias });

    logger.info('Performing schema validation');
    _schemaChecker(event, true);

    logger.info('Schema validation successful');
    logger.trace(`Event obj: ${JSON.stringify(event)}`);

    const { name, language } = input;

    let messageName = name;
    if (!_argValidator.checkString(name, 1)) {
        messageName = 'there';
    }

    return {
        message: `${greeting}, ${messageName}`,
    };
};

export default handler;
