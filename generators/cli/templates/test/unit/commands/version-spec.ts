import { default as _chai, expect } from 'chai';
import { default as _chaiAsPromised } from 'chai-as-promised';
import { default as _sinonChai } from 'sinon-chai';
_chai.use(_sinonChai);
_chai.use(_chaiAsPromised);

import * as _sinon from 'sinon';

import { Promise } from 'bluebird';
import * as _fs from 'fs';
import * as _path from 'path';
import * as command from '../../../src/commands/version';

import 'mocha';

describe('version', () => {
    describe('[init]', () => {
        it('should export properties required by the command', () => {
            const expectedCommand = 'version';
            const expectedDescription = 'Print version number';
            const expectedBuilder = {};

            expect(command.command).to.equal(expectedCommand);
            expect(command.describe).to.equal(expectedDescription);
            expect(command.builder).to.deep.equal(expectedBuilder);
            expect(command.handler).to.be.a('function');
        });
    });

    describe('[execution]', () => {
        it('should return a promise when invoked', () => {
            const ret = command.handler({});

            expect(ret).to.be.an('object');
            expect(ret.then).to.be.a('function');
        });

        it('should print the version number of the executable', () => {
            const readFileMethod = Promise.promisify(_fs.readFile.bind(_fs));
            const stub = _sinon.stub(console, 'log');
            const packageJsonPath = _path.resolve(
                __dirname,
                '../../../package.json'
            );

            return readFileMethod(packageJsonPath)
                .then((packageData) => {
                    packageData = JSON.parse(packageData);

                    stub.resetHistory();
                    const ret = command.handler({});

                    return expect(ret).to.be.fulfilled.then(() => {
                        return packageData.version;
                    });
                })
                .then((expectedVersion) => {
                    expect(stub).to.have.been.calledOnce;
                    expect(stub).to.have.been.calledWithExactly(
                        `v${expectedVersion}`
                    );
                })
                .finally(() => {
                    stub.restore();
                });
        });
    });
});
