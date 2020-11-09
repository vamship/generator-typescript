import { Runtime } from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/core';
import packageJson from 'package.json';

export const lambdaPackage = `dist/${packageJson.name}-${packageJson.version}.zip`;
export const lambdaDefaults = {
    runtime: Runtime.NODEJS_12_X,
    memorySize: 128,
    timeout: Duration.seconds(60),
};
