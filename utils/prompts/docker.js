const _consts = require('../constants');

/**
 * Prompts a user for docker information that is not already known.
 *
 * @param {Object} gen Reference to the generator that is invoking
 *        the prompts.
 * @param {Booleabn} force A parameter that forces re prompting even if
 *        values exist in the config file.
 * @return {Promise} A promise that is resolved/rejected after user input
 *         is completed.
 */
module.exports = function getInfo(gen, force) {
    const properties = ['dockerRequired', 'dockerFullRepo', 'dockerRepoHome'];
    const config = {};
    properties.forEach((propName) => {
        config[propName] = gen.config.get(propName);
    });

    const prompts = [];
    const dockerOptional =
        [_consts.SUB_GEN_CLI, _consts.SUB_GEN_API].indexOf(
            gen.config.get('_projectType')
        ) >= 0;
    const dockerMandatory =
        [_consts.SUB_GEN_CONTAINER].indexOf(gen.config.get('_projectType')) >=
        0;

    if (!config.dockerRequired || force) {
        prompts.push({
            type: 'confirm',
            name: 'dockerRequired',
            message: 'Configure Docker container?',
            when: dockerOptional && !dockerMandatory,
            default: true,
        });
    }

    if (!config.dockerFullRepo || force) {
        prompts.push({
            type: 'input',
            name: 'dockerFullRepo',
            message: 'Docker repo full name?',
            when: (answers) =>
                !dockerOptional || dockerMandatory || answers.dockerRequired,
            default: config.dockerFullRepo,
            validate: (answer) => {
                if (typeof answer !== 'string' || answer.length <= 0) {
                    return 'Please enter the full docker repo name';
                }
                return true;
            },
        });
    }

    if (!config.dockerRepoHome || force) {
        prompts.push({
            type: 'input',
            name: 'dockerRepoHome',
            message: 'Docker repo home page?',
            when: (answers) =>
                !dockerOptional || dockerMandatory || answers.dockerRequired,
            default: config.dockerRepoHome,
            validate: (answer) => {
                if (typeof answer !== 'string' || answer.length <= 0) {
                    return 'Please enter the docker repo home page';
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
