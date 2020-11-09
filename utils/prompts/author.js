const _consts = require('../constants');

/**
 * Prompts a user for author information that is not already known.
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
        'authorName',
        'authorEmail',
        'gitUsername',
        'gitUrl',
        'gitDocumentationUrl',
    ];
    const config = {};
    properties.forEach((propName) => {
        config[propName] = gen.config.get(propName);
    });

    const prompts = [];

    if (!config.authorName || force) {
        prompts.push({
            type: 'input',
            name: 'authorName',
            message: 'Author name?',
            default: config.authorName || '__NA__',
        });
    }

    if (!config.authorEmail || force) {
        prompts.push({
            type: 'input',
            name: 'authorEmail',
            message: 'Author email?',
            default: config.authorEmail || '__NA__',
        });
    }

    if (!config.gitUsername || force) {
        prompts.push({
            type: 'input',
            name: 'gitUsername',
            message: 'Git username?',
            default: (answers) => {
                if (config.gitUsername) {
                    return config.gitUsername;
                }
                if (
                    gen.props &&
                    typeof gen.props.projectNamespace === 'string'
                ) {
                    return gen.props.projectNamespace.substr(1);
                }
                return config.gitUsername || '__NA__';
            },
        });
    }

    if (!config.gitUrl || force) {
        prompts.push({
            type: 'input',
            name: 'gitUrl',
            message: 'Git Url?',
            default: (answers) =>
                `github.com/${answers.gitUsername}/${gen.config.get(
                    'projectName'
                )}`,
        });
    }

    if (!config.gitDocumentationUrl || force) {
        prompts.push({
            type: 'input',
            name: 'gitDocumentationUrl',
            message: 'Documentation URL?',
            default: (answers) => {
                if (config.gitDocumentationUrl) {
                    return config.gitDocumentationUrl;
                }
                return `https://${
                    answers.gitUsername
                }.github.io/${gen.config.get('projectName')}`;
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
