const _consts = require('../constants');

/**
 * Prompts a user for database information that the project might require.
 *
 * @param {Object} gen Reference to the generator that is invoking
 *        the prompts.
 * @param {Booleabn} force A parameter that forces re prompting even if
 *        values exist in the config file.
 * @return {Promise} A promise that is resolved/rejected after user input
 *         is completed.
 */
module.exports = function getInfo(gen, force) {
    const properties = ['dbRequired', 'dbType', 'dbName'];
    const config = {};
    properties.forEach((propName) => {
        config[propName] = gen.config.get(propName);
    });

    const prompts = [];

    if (!config.dbRequired || force) {
        prompts.push({
            type: 'confirm',
            name: 'dbRequired',
            message: 'Configure database for project?',
            default:
                typeof config.dbRequired === 'undefined'
                    ? true
                    : config.dbRequired,
        });
    }

    if (!config.dbType || force) {
        prompts.push({
            type: 'list',
            name: 'dbType',
            message: 'Select database type:',
            choices: ['mysql', 'some other database'],
            when: (answers) => answers.dbRequired,
            default: config.dbType || 1,
        });
    }

    if (!config.dbName || force) {
        prompts.push({
            type: 'input',
            name: 'dbName',
            message: 'Database name?',
            when: (answers) => answers.dbRequired && answers.dbType === 'mysql',
            default: config.dbName,
            validate: (answer) => {
                if (answer.length <= 0) {
                    return 'Please enter a valid database name';
                }
                return true;
            },
        });
    }

    return gen.prompt(prompts).then((props) => {
        gen.props = gen.props || {};
        properties.forEach((propName) => {
            let propValue = props[propName];
            if (propValue === undefined) {
                propValue = config[propName];
            }

            gen.props[propName] = propValue;
            gen.config.set(propName, propValue);
        });
    });
};
