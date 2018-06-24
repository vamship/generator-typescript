'use strict';

module.exports = {
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
    getProjectInfo: function(gen, force) {
        const properties = [
            'projectNamespace',
            'projectName',
            'projectDescription',
            'projectKeywords'
        ];
        const config = {};
        properties.forEach((propName) => {
            config[propName] = gen.config.get(propName);
        });

        const prompts = [];

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
                }
            });
        }

        if (!config.projectName || force) {
            prompts.push({
                type: 'input',
                name: 'projectName',
                message: 'Project name?',
                default: (config.projectName || gen.appname).replace(/\s/g, '-')
            });
        }

        if (!config.projectDescription || force) {
            prompts.push({
                type: 'input',
                name: 'projectDescription',
                message: 'Project description?',
                default: config.projectDescription || 'My Typescript project'
            });
        }

        if (!config.projectKeywords || force) {
            prompts.push({
                type: 'input',
                name: 'projectKeywords',
                message: 'Project keywords (comma separated)?',
                default: config.projectKeywords || [],
                filter: (answer) => {
                    if(answer instanceof Array) {
                        return answer;
                    }
                    return answer
                        .split(',')
                        .map((keyword) => `${keyword.trim()}`)
                        .filter(keyword => !!keyword);
                }
            });
        }

        return gen.prompt(prompts).then((props) => {
            gen.props = gen.props || {};

            const { projectNamespace, projectName } = props;
            gen.props.projectNamespacedName = projectName;
            if (projectNamespace !== '') {
                gen.props.projectNamespacedName = `${projectNamespace}/${projectName}`;
            }

            properties.forEach((propName) => {
                let propValue = props[propName];
                if (propValue === undefined) {
                    propValue = config[propName];
                }

                gen.props[propName] = propValue;
                gen.config.set(propName, propValue);
            });
        });
    },

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
    getAuthorInfo: function(gen, force) {
        const properties = [
            'authorName',
            'authorEmail',
            'gitUsername',
            'gitUrl'
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
                default: config.authorName || '__NA__'
            });
        }

        if (!config.authorEmail || force) {
            prompts.push({
                type: 'input',
                name: 'authorEmail',
                message: 'Author email?',
                default: config.authorEmail || '__NA__'
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
                }
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
                    )}`
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
    }
};
