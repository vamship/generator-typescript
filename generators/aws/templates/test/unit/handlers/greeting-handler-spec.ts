import _chai from 'chai';
import _chaiAsPromised from 'chai-as-promised';
import 'mocha';
import _rewire from 'rewire';
import _sinonChai from 'sinon-chai';

_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
const expect = _chai.expect;

import { testValues as _testValues } from '@vamship/test-utils';

const _greetingHandlerModule = _rewire(
    '../../../src/handlers/greeting-handler'
);
const greetingHandler = _greetingHandlerModule.default;

describe('greetingHandler()', () => {
    it('should return an object when invoked', () => {
        const ret = greetingHandler({});

        expect(ret).to.be.an('object');
        expect(ret.message).to.be.a('string').and.to.not.be.empty;
    });

    it('should return a message for the default language if the language is not recognized', () => {
        const inputs = ['es', 'it'];
        inputs.forEach((language) => {
            const name = _testValues.getString('name');
            const ret = greetingHandler({
                name,
                language,
            });

            expect(ret).to.deep.equal({
                message: `Hello, ${name}`,
            });
        });
    });

    it('should return a message based on the language if the language is recognized', () => {
        const inputs = [
            {
                language: 'fr',
                greeting: 'Bonjour',
            },
            {
                language: 'en',
                greeting: 'Hello',
            },
        ];

        inputs.forEach(({ language, greeting }) => {
            const name = _testValues.getString('name');
            const ret = greetingHandler({
                name,
                language,
            });

            expect(ret).to.deep.equal({
                message: `${greeting}, ${name}`,
            });
        });
    });

    it('should default the name to "there" if no name is specified', () => {
        const inputs = _testValues.allButString('');
        inputs.forEach((name) => {
            const ret = greetingHandler({
                name,
                language: 'en',
            });

            expect(ret).to.deep.equal({
                message: `Hello, there`,
            });
        });
    });
});
