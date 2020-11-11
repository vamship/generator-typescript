import { NatProvider, SubnetType, Vpc } from '@aws-cdk/aws-ec2';
import { CfnOutput, Stack } from '@aws-cdk/core';
import {
    ConstructFactory,
    EnvUtils,
    IConstructProps,
} from '@vamship/cdk-utils';
import {
    availabilityZoneCount,
    privateSubnetsPerAz,
    publicSubnetsPerAz,
    vpcCidrBlock,
} from '../../../utils/vpc-config';

/**
 * Construct factory for the VPC
 */
class VpcFactory extends ConstructFactory<Vpc> {
    public async _init(scope: Stack, props: IConstructProps): Promise<Vpc> {
        const publicSubnetConfiguration = new Array(publicSubnetsPerAz)
            .fill(0)
            .map(() => ({
                name: 'public',
                subnetType: SubnetType.PUBLIC,
            }));

        const privateSubnetConfiguration = new Array(privateSubnetsPerAz)
            .fill(0)
            .map(() => ({
                name: 'private',
                subnetType: SubnetType.PRIVATE,
            }));

        const vpc = new Vpc(scope, this.id, {
            cidr: vpcCidrBlock,
            enableDnsHostnames: true,
            enableDnsSupport: true,
            maxAzs: availabilityZoneCount,
            natGatewayProvider: NatProvider.gateway(),
            subnetConfiguration: publicSubnetConfiguration.concat(
                privateSubnetConfiguration
            ),
        });

        const privateSubnets = vpc.privateSubnets.map(
            ({ subnetId }) => subnetId
        );

        const publicSubnets = vpc.publicSubnets.map(({ subnetId }) => subnetId);

        new CfnOutput(scope, 'VpcId', {
            value: vpc.vpcId,
            exportName: `${scope.stackName}:vpc-id`,
        });

        new CfnOutput(scope, 'SubnetIds', {
            value: privateSubnets.concat(publicSubnets).toString(),
            exportName: `${scope.stackName}:subnet-ids`,
        });

        new Array(availabilityZoneCount).fill(0).forEach((item, azIndex) => {
            new CfnOutput(scope, `AvailabilityZone-${azIndex}`, {
                value: vpc.availabilityZones[azIndex],
                exportName: `${scope.stackName}:availability-zone-${azIndex}`,
            });

            publicSubnetConfiguration.forEach((item, index) => {
                const subnetIndex = publicSubnetsPerAz * azIndex + index;
                new CfnOutput(scope, `PublicSubnet-${subnetIndex}`, {
                    value: publicSubnets[subnetIndex],
                    exportName: `${scope.stackName}:public-subnet-${subnetIndex}`,
                });
            });

            privateSubnetConfiguration.forEach((item, index) => {
                const subnetIndex = privateSubnetsPerAz * azIndex + index;
                new CfnOutput(scope, `PrivateSubnet-${subnetIndex}`, {
                    value: privateSubnets[subnetIndex],
                    exportName: `${scope.stackName}:private-subnet-${subnetIndex}`,
                });
            });
        });

        return vpc;
    }
}

const factory = new VpcFactory('<%= projectPrefix %>-vpc');
export default factory;
