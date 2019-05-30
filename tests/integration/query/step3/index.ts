// Copyright 2016-2018, Pulumi Corporation.  All rights reserved.

import * as pulumi from "@pulumi/pulumi";

pulumi.runtime
    .listResourceOutputs()
    .groupBy<string, pulumi.Resource>(r => (<any>r).__pulumiType)
    .all(async function(group) {
        const count = await group.count();
        if (group.key === "pulumi-nodejs:dynamic:Resource" && count !== 2) {
            throw Error(`Expected 2 registered resources, got ${count}`);
        }
        console.log(group.key);
        return (
            group.key === "pulumi-nodejs:dynamic:Resource" ||
            group.key === "pulumi:providers:pulumi-nodejs" ||
            group.key === "pulumi:pulumi:Stack"
        );
    })
    .then(res => {
        if (res !== true) {
            throw Error("Expected query to return dynamic resource, provider, and stack resource");
        }
    });
