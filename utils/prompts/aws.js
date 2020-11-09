const _consts = require('../constants');

/**
 * Prompts a user for aws infrastructure information that is not already known.
 *
 * @param {Object} gen Reference to the generator that is invoking
 *        the prompts.
 * @param {Booleabn} force A parameter that forces re prompting even if
 *        values exist in the config file.
 * @return {Promise} A promise that is resolved/rejected after user input
 *         is completed.
 */
module.exports = function getInfo(gen, force) {
    const properties = [
        'awsRegion'
    ];
    const config = {};
    properties.forEach((propName) => {
        config[propName] = gen.config.get(propName);
    });

    const prompts = [];

    if (!config.awsRegion || force) {
        prompts.push({
            type: 'input',
            name: 'awsRegion',
            message: 'AWS region?',
            default: config.awsRegion || 'us-east-1',
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
