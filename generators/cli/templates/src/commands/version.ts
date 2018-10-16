/**
 * Sub command to show executable version.
 */
import { Promise } from 'bluebird';
import * as _fs from 'fs';
import * as _path from 'path';

export const command = 'version';
export const describe = 'Print version number';
export const builder = {};
export const handler = (argv) => {
    const readFileMethod = Promise.promisify(_fs.readFile.bind(_fs));
    const packageJsonPath = _path.resolve(__dirname, '../../package.json');
    return readFileMethod(packageJsonPath).then((packageData) => {
        packageData = JSON.parse(packageData);
        /* tslint:disable:no-console */
        console.log(`v${packageData.version}`);
        /* tslint:enable:no-console */
    });
};
