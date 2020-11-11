import { Stack, Fn } from '@aws-cdk/core';
import { ConstructFactory, IConstructProps } from '@vamship/cdk-utils';
import { IVpc, Vpc } from '@aws-cdk/aws-ec2';

import {
    vpcCidrBlock,
    availabilityZoneCount,
    publicSubnetsPerAz,
    privateSubnetsPerAz,
} from './vpc-config';

/**
 * Construct factory that returns a reference to an existing VPC.
 */
export default class VpcRefFactory extends ConstructFactory<IVpc> {
    public async _init(scope: Stack, props: IConstructProps): Promise<IVpc> {
        const vpcId = Fn.importValue(`${scope.stackName}:vpc-id`);
        const availabilityZones: string[] = [];
        const publicSubnetIds: string[] = [];
        const privateSubnetIds: string[] = [];

        new Array(availabilityZoneCount).fill(0).map((item, azIndex) => {
            // Build azs from lookups
            availabilityZones.push(
                Fn.importValue(
                    `${scope.stackName}:availability-zone-${azIndex}`
                )
            );

            // Build public subnet ids from lookups
            new Array(publicSubnetsPerAz).fill(0).forEach((item, index) => {
                const subnetIndex = publicSubnetsPerAz * azIndex + index;
                publicSubnetIds.push(
                    Fn.importValue(
                        `${scope.stackName}:public-subnet-${subnetIndex}`
                    )
                );
            });

            // Build private subnet ids from lookups
            new Array(privateSubnetsPerAz).fill(0).forEach((item, index) => {
                const subnetIndex = privateSubnetsPerAz * azIndex + index;
                privateSubnetIds.push(
                    Fn.importValue(
                        `${scope.stackName}:private-subnet-${subnetIndex}`
                    )
                );
            });
        });

        const vpc = Vpc.fromVpcAttributes(scope, this.id, {
            vpcId,
            vpcCidrBlock,
            availabilityZones,
            publicSubnetIds,
            privateSubnetIds,
        });

        return vpc;
    }
}

const factory = new VpcRefFactory('<%= projectPrefix%>-vpc');
export default factory;
