import * as core from '@actions/core';

function run(): void {
    try {
        const ms: string = core.getInput('milliseconds');
        core.debug(`Waiting ${ms} milliseconds ...`);

        core.debug(new Date().toTimeString());
        core.debug(new Date().toTimeString());
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed('unknown error');
        }
    }
}

run();
