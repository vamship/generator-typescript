/**
 * Sub command to show a greeting message
 */
import { Promise } from 'bluebird';

export const command = 'greet';
export const describe = 'Print greeting message';
export const builder = {};
export const handler = (argv: Record<string, unknown>): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            /* tslint:disable:no-console */
            console.log('Hello!');
            /* tslint:enable:no-console */

            resolve();
        }, 100);
    });
};
