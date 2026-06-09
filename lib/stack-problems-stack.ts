import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { ExitOnStartup } from './ecs-exit-on-startup/ecs-exit-on-startup';
import { InvalidResourceProps } from './invalid-resource-props/invalid-resource-props';

export class StackProblemsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an ECS cluster
    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    // Add capacity to it
    /*
    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType("t2.xlarge"),
    });
    */

    //////////////////////////////////////////////////////////////////////
    // Introduce failures here
    // new ExitOnStartup(this, 'ExitOnStartup', { cluster });
    new InvalidResourceProps(this, 'ResourceProps');
  }
}

