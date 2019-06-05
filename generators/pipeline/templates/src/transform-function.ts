import { IMessage } from 'agc-pipeline-node/dist/types/message';
import { Action, IResult } from 'agc-pipeline-node/dist/types/result';

/**
 * @module transform-function
 * Implementation of a data-transformation function.
 */
const transform = (message: IMessage): IResult => {
    const { data } = message;

    // TODO: Validate & process your data
    // tslint:disable-next-line
    console.log(data);

    // TODO: return some IResult
    const result = 'processed!';

    return {
        action: Action.Forward,
        target: '',
        message: {
            kind: 'string',
            data: `Data payload: ${result}`
        }
    };
};

export default transform;
