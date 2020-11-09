import { Code, Function } from '@aws-cdk/aws-lambda';
import { Stack } from '@aws-cdk/core';
import {
    ConstructFactory,
    EnvUtils,
    IConstructProps,
} from '@vamship/cdk-utils';
import vpcFactory from '../external/vpc';
import lambdaRoleFactory from '../iam/lambda-role';
import { lambdaPackage, lambdaDefaults } from '../../../utils/lambda-config';

class AeComplianceCheckerFactory extends ConstructFactory<Function> {
    /**
     * @override
     */
    protected async _init(
        stack: Stack,
        props?: IConstructProps
    ): Promise<Function> {
        const lambdaName = '<%= projectPrefix %>-greeting';
        const lambdaDesc = 'Polite lambda that greets the user';

        const role = await lambdaRoleFactory.getConstruct(stack);
        const vpc = await vpcFactory.getConstruct(stack);

        const lambda = new Function(stack, this.id, {
            ...lambdaDefaults,
            functionName: lambdaName,
            description: lambdaDesc,
            handler: `src/index.greetingHandler`,
            code: Code.fromAsset(lambdaPackage),
            environment: {
            },
            role,
            vpc,
        });

        return lambda;
    }
}

const factory = new AeComplianceCheckerFactory('<%= projectPrefix %>-greeting');
export default factory;
