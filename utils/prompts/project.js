const _semver = require('semver');
const _camelcase = require('camelcase');
const _consts = require('../constants');

/**
 * Prompts a user for project information that is not already known.
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
        'projectNamespace',
        'projectName',
        'projectPrefix',
        'projectVersion',
        'projectDescription',
        'projectKeywords',
        'projectCliName',
    ];
    const config = {};
    properties.forEach((propName) => {
        config[propName] = gen.config.get(propName);
    });

    const prompts = [];
    const cliRequired = gen.config.get('_projectType') === _consts.SUB_GEN_CLI;
    const prefixRequired =
        gen.config.get('_projectType') === _consts.SUB_GEN_AWS;

    if (config.projectNamespace === undefined || force) {
        prompts.push({
            type: 'input',
            name: 'projectNamespace',
            message: 'Project namespace (leave empty if none)?',
            default: config.projectNamespace || '',
            validate: (answer) => {
                if (answer !== '' && !answer.startsWith('@')) {
                    return 'Namespaces must start with a "@"';
                }
                return true;
            },
        });
    }

    if (!config.projectName || force) {
        prompts.push({
            type: 'input',
            name: 'projectName',
            message: 'Project name?',
            default: (config.projectName || gen.appname).replace(/\s/g, '-'),
        });
    }

    if (!config.projectPrefix || force) {
        prompts.push({
            type: 'input',
            name: 'projectPrefix',
            message: 'Project prefix (3 characters)?',
            default: config.projectPrefix || '',
            when: prefixRequired,
            validate: (answer) => {
                if (!answer.match(/[a-z]{3}/)) {
                    return 'Please enter exactly 3 lowercase letters';
                }
                return true;
            },
        });
    }

    if (!config.projectCliName || force) {
        prompts.push({
            type: 'input',
            name: 'projectCliName',
            message: 'Command name?',
            when: cliRequired,
            default: (answers) =>
                config.projectCliName ||
                answers.projectName.replace(/\.js$/, ''),
        });
    }

    if (!config.projectVersion || force) {
        prompts.push({
            type: 'input',
            name: 'projectVersion',
            message: 'Project version?',
            default: config.projectVersion || '0.0.1',
            validate: (answer) => {
                if (!_semver.valid(answer)) {
                    return 'Please enter a SemVer compatible version string';
                }
                return true;
            },
        });
    }

    if (!config.projectDescription || force) {
        prompts.push({
            type: 'input',
            name: 'projectDescription',
            message: 'Project description?',
            default: config.projectDescription || 'My Typescript project',
        });
    }

    if (!config.projectKeywords || force) {
        prompts.push({
            type: 'input',
            name: 'projectKeywords',
            message: 'Project keywords (comma separated)?',
            default: config.projectKeywords || [],
            filter: (answer) => {
                if (answer instanceof Array) {
                    return answer;
                }
                return answer
                    .split(',')
                    .map((keyword) => `${keyword.trim()}`)
                    .filter((keyword) => !!keyword);
            },
        });
    }

    return gen.prompt(prompts).then((props) => {
        gen.props = gen.props || {};

        const { projectNamespace, projectName } = props;
        gen.props.projectNamespacedName = projectName;
        if (projectNamespace !== '') {
            gen.props.projectNamespacedName = `${projectNamespace}/${projectName}`;
        }
        gen.props.projectCamelCasedName = _camelcase(projectName);

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
