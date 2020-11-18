import { HandlerWrapper } from '@vamship/aws-lambda';

// import handlers
import { default as greetingHandler } from './handlers/greeting-handler';

/**
 * Interface for an object that maintains handler name/handler mapping.
 */
interface IHandlerInfo {
    /**
     * The name of the handler.
     */
    name: string;

    /**
     * Reference to the handler function.
     */
    handler: unknown;
}

const handlers: IHandlerInfo[] = [
    {
        name: 'greetingHandler',
        handler: greetingHandler,
    },
];

const wrapper = new HandlerWrapper('<%= projectCamelCasedName %>');

module.exports = handlers.reduce(
    (result: { [key: string]: unknown }, handlerInfo: IHandlerInfo) => {
        const { name, handler } = handlerInfo;

        result[name] = wrapper.wrap(handler, name);
        return result;
    },
    {}
);
