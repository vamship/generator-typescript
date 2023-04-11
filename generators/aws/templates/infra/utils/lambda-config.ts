import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import packageJson from '../../package.json';

const { name, version } = packageJson;

export const lambdaPackage = `dist/${name
    .replace(/\//g, '-')
    .replace(/@/g, '')}-${version}.zip`;
export const lambdaDefaults = {
    runtime: Runtime.NODEJS_12_X,
    memorySize: 128,
    timeout: Duration.seconds(60),
};
