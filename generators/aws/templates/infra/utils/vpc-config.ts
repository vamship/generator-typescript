import { EnvUtils } from '@vamship/cdk-utils';

/**
 * The CIDR block to assign to the VPC.
 */
export const vpcCidrBlock = EnvUtils.getString('VPC_CIDR_BLOCK');

/**
 * The number of availability zones in the VPC
 */
export const availabilityZoneCount = EnvUtils.getNumber('VPC_AZ_COUNT');

/**
 * The number of private subnets per availability zone.
 */
export const privateSubnetsPerAz = EnvUtils.getNumber(
    'VPC_PRIVATE_SUBNET_PER_AZ'
);

/**
 * The number of public subnets per availability zone.
 */
export const publicSubnetsPerAz = EnvUtils.getNumber(
    'VPC_PUBLIC_SUBNET_PER_AZ'
);
