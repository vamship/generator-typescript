import { default as _chai, expect } from 'chai';
import { default as _chaiAsPromised } from 'chai-as-promised';
import { default as _sinonChai } from 'sinon-chai';
_chai.use(_sinonChai);
_chai.use(_chaiAsPromised);

import * as _sinon from 'sinon';

import { consoleHelper as _consoleHelper } from '@vamship/test-utils';
import { Promise } from 'bluebird';
import * as command from '../../../src/commands/greet';

import 'mocha';

describe('greet', () => {
    function _execHandler(args: object, noMute: boolean = false) {
        args = Object.assign({}, args);

        if (!noMute) {
            _consoleHelper.mute();
        }
        return Promise.try(() => {
            return command.handler(args);
        }).finally(() => {
            if (!noMute) {
                _consoleHelper.unmute();
            }
        });
    }

    describe('[init]', () => {
        it('should export properties required by the command', () => {
            const expectedCommand = 'greet';
            const expectedDescription = 'Print greeting message';
            const expectedBuilder = {};

            expect(command.command).to.equal(expectedCommand);
            expect(command.describe).to.equal(expectedDescription);
            expect(command.builder).to.deep.equal(expectedBuilder);
            expect(command.handler).to.be.a('function');
        });
    });

    describe('[execution]', () => {
        it('should return a promise when invoked', () => {
            const ret = _execHandler({});

            expect(ret).to.be.an('object');
            expect(ret.then).to.be.a('function');

            return ret;
        });

        it('should print a greeting message', () => {
            const stub = _sinon.stub(console, 'log');

            stub.resetHistory();
            const ret = _execHandler({}, true);

            return Promise.resolve()
                .then(() => {
                    return expect(ret).to.be.fulfilled;
                })
                .then(() => {
                    expect(stub).to.have.been.calledOnce;
                    expect(stub).to.have.been.calledWithExactly('Hello!');
                })
                .finally(() => {
                    stub.restore();
                });
        });
    });
});
