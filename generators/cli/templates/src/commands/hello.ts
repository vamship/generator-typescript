/**
 * Sub command to show a hello message
 */
import { Promise } from 'bluebird';

export const command = 'version';
export const describe = 'Print version number';
export const builder = {};
export const handler = (argv) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            /* tslint:disable:no-console */
            console.log('Hello!');
            /* tslint:enable:no-console */

            resolve();
        }, 100);
    });
};
