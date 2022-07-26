import * as core from '@actions/core';
import * as github from '@actions/github';

function run(): void {
    try {
        const { eventName } = github.context;
        core.info(`Event name: ${eventName}`);

        if (eventName !== 'pull_request') {
            core.setFailed(`Invalid event: ${eventName}`);
            return;
        }

        const pullRequestTitle = github.context.payload.pull_request?.title;
        core.info(`PR title: ${pullRequestTitle}`);

        if (!pullRequestTitle) {
            core.setFailed('Pull Request title not defined');
            return;
        }

        const inputRegexString = core.getInput('regex');
        core.info(`Input regex: ${inputRegexString}`);

        const regex = new RegExp(inputRegexString, 'gm');
        const regexExistsInTitle = regex.test(pullRequestTitle);

        if (!regexExistsInTitle) {
            core.setFailed('PR title does not contain regex pattern');
            return;
        }

        core.info('Pattern exists in PR title');
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed('unknown error');
        }
    }
}

run();
