import _loggerProvider from '@vamship/logger';
_loggerProvider.enableMock();

import _chai from 'chai';
import _chaiAsPromised from 'chai-as-promised';
import _sinonChai from 'sinon-chai';
_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
const expect = _chai.expect;

import { testValues as _testValues } from '@vamship/test-utils';
import { LambdaTestWrapper, InputValidator } from '@vamship/aws-test-utils';
import _rewire from 'rewire';
import { Promise } from 'bluebird';

import {
    IGreetingInput,
    IGreetingOutput,
    IContext,
    IExt,
} from '../../../src/types';

const _handlerName = 'index.greetingHandler';
type GreetingHandler = (
    event: IGreetingInput,
    context: IContext,
    ext: IExt
) => IGreetingOutput;

let _handlerModule: { default: GreetingHandler };
let _handler: GreetingHandler;

describe('[index.greetingHandler]', () => {
    function _createWrapper(event?) {
        event = Object.assign(
            {
                name: _testValues.getString('name'),
                language: 'en',
            },
            event
        );
        return new LambdaTestWrapper(_handlerName, _handler, event);
    }

    beforeEach(() => {
        _handlerModule = _rewire('../../../src/handlers/greeting-handler');
        _handler = _handlerModule.default;
    });

    it('should fail execution if the event input does not define a valid name property', () => {
        const wrapper = _createWrapper();
        const validator = new InputValidator(wrapper);

        return validator.checkRequiredString(
            'name',
            (wrapper, type, pattern) => {
                return expect(wrapper.invoke()).to.be.rejectedWith(
                    type,
                    pattern
                );
            }
        );
    });

    it('should fail execution if the event input does not define a valid language property', () => {
        const wrapper = _createWrapper();
        const validator = new InputValidator(wrapper);

        return validator.checkRequiredString(
            'language',
            (wrapper, type, pattern) => {
                return expect(wrapper.invoke()).to.be.rejectedWith(
                    type,
                    pattern
                );
            },
            ['es', 'it']
        );
    });

    it('should return a message based on the language if the language is recognized', async () => {
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

        await Promise.map(inputs, async ({ language, greeting }) => {
            const name = _testValues.getString('name');
            const wrapper = _createWrapper({ name, language });

            const ret = await wrapper.invoke();

            expect(ret).to.deep.equal({
                message: `${greeting}, ${name}`,
            });
        });
    });
});
