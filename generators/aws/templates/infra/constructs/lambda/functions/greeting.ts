import { Code, Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Stack } from 'aws-cdk-lib';
import { ConstructFactory, IConstructProps } from '@vamship/cdk-utils';
import vpcFactory from '../external/vpc';
import { lambdaPackage, lambdaDefaults } from '../../../utils/lambda-config';

class GreetingFactory extends ConstructFactory<LambdaFunction> {
    /**
     * @override
     */
    protected async _init(
        stack: Stack,
        props?: IConstructProps
    ): Promise<LambdaFunction> {
        const lambdaName = '<%= projectPrefix %>-greeting';
        const lambdaDesc = 'Polite lambda that greets the user';

        const vpc = await vpcFactory.getConstruct(stack);

        const lambda = new LambdaFunction(stack, this.id, {
            ...lambdaDefaults,
            functionName: lambdaName,
            description: lambdaDesc,
            handler: `src/index.greetingHandler`,
            code: Code.fromAsset(lambdaPackage),
            environment: {},
            vpc,
        });

        return lambda;
    }
}

const factory = new GreetingFactory('<%= projectPrefix %>-greeting');
export default factory;
