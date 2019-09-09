#!/usr/bin/env node

var devnull = require('dev-null');
const getLogger = require("semantic-release/lib/get-logger");
const getConfig = require("semantic-release/lib/get-config");
const getCommits = require("semantic-release/lib/get-commits");
const git = require("semantic-release/lib/git");
const getNextVersion = require("semantic-release/lib/get-next-version");
const getLastRelease = require("semantic-release/lib/get-last-release");
const utils = require("semantic-release/lib/plugins/utils");

const context: any = { cwd: process.cwd(), env: process.env, stdout: devnull(), stderr: process.stderr };

(async () => {
    try {
        context.logger = getLogger(context);

        const { plugins, options } = await getConfig(context, { plugins: [] });
        context.options = options;

        context.lastRelease = await getLastRelease(context);
        context.commits = await getCommits(context);

        const nextRelease: any = { type: await plugins.analyzeCommits(context), gitHead: await git.getGitHead({ cwd: context.cwd, env: context.env }) };

        if (!nextRelease.type) {
            return false;
        }
        else {
            context.nextRelease = nextRelease;
            nextRelease.version = getNextVersion(context);
            return nextRelease.version;
        }

    } catch (e) {
        console.error(e);
    }
})();