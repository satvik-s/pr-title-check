import * as core from '@actions/core';
import * as github from '@actions/github';

const DEFAULT_FLAGS = 'gm';

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

        const inputPattern = core.getInput('pattern');
        const inputFlags = core.getInput('flags');

        core.debug(inputPattern);
        core.debug(inputFlags);

        if (inputPattern === '') {
            core.setFailed('Input pattern is empty');
            return;
        }

        if (inputFlags === '') {
            core.info('No input flags present. will fallback to default');
        }

        const regexPattern = inputPattern;
        const regexFlags = inputFlags === '' ? DEFAULT_FLAGS : inputFlags;

        core.info(`Patter: ${regexPattern}`);
        core.info(`Flags: ${regexFlags}`);

        if (!regexPattern || !regexFlags) {
            core.setFailed('Required parameters absent');
            return;
        }

        const regex = new RegExp(regexPattern, regexFlags);
        const regexExistsInTitle = regex.test(pullRequestTitle);

        if (!regexExistsInTitle) {
            core.setFailed(
                'PR title does not contain the provided regex pattern',
            );
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
