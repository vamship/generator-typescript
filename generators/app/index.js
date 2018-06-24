'use strict';
const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');

const _consts = require('../../utils/constants');
const _package = require('../../package.json');

module.exports = class extends Generator {
    /**
     * Gather basic project information.
     */
    gatherProjectInfo() {
        const generatorTitle = `${_consts.GENERATOR_NAME} v${_package.version}`;
        this.log(
            _yosay(`Typescript Project Generators.\n${_chalk.red(generatorTitle)} `)
        );
        this.prompt([
            {
                type: 'list',
                name: 'templateType',
                message: 'What type of project do you want to create?',
                choices: ['api server', 'library'],
                default: 'library'
            }
        ]).then((answers) => {
            this.log(answers.templateType);
            if (answers.templateType === 'api server') {
                this.composeWith(
                    `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_API}`
                );
            } else {
                this.composeWith(
                    `${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_LIB}`
                );
            }
        });
    }
};
