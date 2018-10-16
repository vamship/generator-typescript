#!/usr/bin/env node
'use strict';

import * as _loggerProvider from '@vamship/logger';
import * as _yargs from 'yargs';

_loggerProvider.configure('software-updater', {
    level: process.env.LOG_LEVEL || 'error'
});
const _logger = _loggerProvider.getLogger('main');

_logger.trace('Logger initialized');

const argv = _yargs
    .usage('Usage $0 <command> <sub commands> <options>')
    .commandDir('../commands')
    .demandCommand()
    .help()
    .wrap(_yargs.terminalWidth()).argv;

_logger.trace('Input arguments', argv);
