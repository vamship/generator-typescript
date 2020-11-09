import * as _path from 'path';

import { App, Stack } from '@aws-cdk/core';
import { ConstructBuilder } from '@vamship/cdk-utils';

async function main(): Promise<void> {
    // Initialize stacks
    const app = new App();
    const coreStack = new Stack(app, '<%= projectPrefix %>-core');
    const lambdaStack = new Stack(app, '<%= projectPrefix %>-lambda');

    // Build out stack using resources under the constructs directory
    const coreRootDir = _path.join(__dirname, 'constructs/core');
    const lambdaRootDir = _path.join(__dirname, 'constructs/lambda');

    // Initialize builder
    const coreStackBuilder = new ConstructBuilder(coreRootDir);
    const lambdaStackBuilder = new ConstructBuilder(lambdaRootDir);

    // Build out the stacks using custom props if necessary
    await coreStackBuilder.build(coreStack, {});
    await lambdaStackBuilder.build(lambdaStack, {});
}

main().catch((err) => {
    console.error('Error processing CDK scripts', err);
    process.exit(1);
});
