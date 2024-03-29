'use strict';
const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');

const _prompts = require('../../utils/prompts');
const _consts = require('../../utils/constants');
const _package = require('../../package.json');

module.exports = class extends Generator {
    /**
     * Gather basic project information.
     */
    gatherProjectInfo() {
        const generatorTitle = `${_consts.GENERATOR_NAME} v${_package.version}`;
        this.log(
            _yosay(`Typescript AWS Microservice Generator.\n${_chalk.red(generatorTitle)} `)
        );

        this.config.set('_projectType', _consts.SUB_GEN_AWS);
        return _prompts
            .getProjectInfo(this, true)
            .then(() => _prompts.getAuthorInfo(this, true))
            .then(() => _prompts.getAwsInfo(this, true));
    }

    /**
     * Creates project files
     */
    createProjectFiles() {
        const fileList = [
            'package.json',
            'Gulpfile.js',
            'README.md',
            'LICENSE',
            '_gitignore',
            '_projections.json',
            '_eslintrc.js',
            'tsconfig.json',
            '_prettierrc',

            'src/index.ts',
            'src/handlers/greeting-handler.ts',

            'src/schema/greeting-handler.json',

            'src/types/index.ts',
            'src/types/greeting.ts',
            'src/types/lambda.ts',

            'test/unit/handlers/greeting-handler-spec.ts',

            'infra/index.ts',
            'infra/_env',
            'infra/_env.development',
            'infra/_env.qa',
            'infra/_env.production',

            'infra/constructs/core/vpc/vpc.ts',

            'infra/constructs/lambda/external/vpc.ts',
            'infra/constructs/lambda/functions/greeting.ts',

            'infra/utils/lambda-config.ts',
            'infra/utils/vpc-config.ts',

            'docs/index.md'
        ];

        fileList.forEach((srcFile) => {
            const tokens = srcFile.split('/');

            // Replace leading _ with . in the file name
            const fileName = tokens[tokens.length - 1];
            if (fileName.indexOf('_') === 0) {
                tokens[tokens.length - 1] = fileName.replace('_', '.');
            }

            const destFile = tokens.join('/');
            this.fs.copyTpl(
                this.templatePath(srcFile),
                this.destinationPath(destFile),
                this.props
            );
        });
    }

    /**
     * Display completed message with future actions.
     */
    finish() {
        const buildTool = _chalk.green('gulp');
        const buildCommand = _chalk.yellow('build');
        const buildOnChangeCommand = _chalk.yellow('watch-build');
        const testCommand = _chalk.yellow('test-unit');
        const testOnChangeCommand = _chalk.yellow('watch-test-unit');
        const watchTestCommand = _chalk.yellow('monitor:unit');
        const formatCommand = _chalk.yellow('format');
        const lintCommand = _chalk.yellow('lint');
        const tasksCommand = _chalk.yellow('--tasks');
        const docsCommand = _chalk.yellow('docs');

        this.log(_consts.SEPARATOR);
        [
            `                                                                                `,
            `--------------------------------------------------------------------------------`,
            ` Your Typescript libary project has been created, and is ready for use. Gulp`,
            ` tasks have been provided for common development tasks such as:`,
            ``,
            ` Building typescript files:`,
            `   ${buildTool} ${buildCommand}`,
            ` Build files on change:`,
            `   ${buildTool} ${buildOnChangeCommand}`,
            ``,
            ` Running all unit tests:`,
            `   ${buildTool} ${testCommand}`,
            ` Test files on change:`,
            `   ${buildTool} ${testOnChangeCommand}`,
            ``,
            ` Formatting and linting files:`,
            `   ${buildTool} ${formatCommand}`,
            `   ${buildTool} ${lintCommand}`,
            ``,
            ` Several other useful tasks have been packaged up with the Gulpfile. You can`,
            ` review them all by running:`,
            `   ${buildTool} ${tasksCommand}`,
            ``,
            `--------------------------------------------------------------------------------`,
            ``,
        ].forEach((line) => this.log(line));
    }
};
