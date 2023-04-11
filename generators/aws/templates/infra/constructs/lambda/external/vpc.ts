import { Stack, Fn } from 'aws-cdk-lib';
import { ConstructFactory, IConstructProps } from '@vamship/cdk-utils';
import { IVpc, Vpc } from 'aws-cdk-lib/aws-ec2';

import {
    vpcCidrBlock,
    availabilityZoneCount,
    publicSubnetsPerAz,
    privateSubnetsPerAz,
} from '../../../utils/vpc-config';

/**
 * Construct factory that returns a reference to an existing VPC.
 */
class VpcRefFactory extends ConstructFactory<IVpc> {
    public async _init(scope: Stack, props: IConstructProps): Promise<IVpc> {
        const vpcId = Fn.importValue(`<%= projectPrefix %>-core:vpc-id`);
        const availabilityZones: string[] = [];
        const publicSubnetIds: string[] = [];
        const privateSubnetIds: string[] = [];

        new Array(availabilityZoneCount).fill(0).map((item, azIndex) => {
            // Build azs from lookups
            availabilityZones.push(
                Fn.importValue(`<%= projectPrefix %>-core:availability-zone-${azIndex}`)
            );

            // Build public subnet ids from lookups
            new Array(publicSubnetsPerAz).fill(0).forEach((item, index) => {
                const subnetIndex = publicSubnetsPerAz * azIndex + index;
                publicSubnetIds.push(
                    Fn.importValue(`<%= projectPrefix %>-core:public-subnet-${subnetIndex}`)
                );
            });

            // Build private subnet ids from lookups
            new Array(privateSubnetsPerAz).fill(0).forEach((item, index) => {
                const subnetIndex = privateSubnetsPerAz * azIndex + index;
                privateSubnetIds.push(
                    Fn.importValue(`<%= projectPrefix %>-core:private-subnet-${subnetIndex}`)
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
