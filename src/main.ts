import * as core from '@actions/core';
import * as github from '@actions/github';

const DEFAULT_FLAGS = 'gm';
const DEFAULT_PATTERN =
    // eslint-disable-next-line prettier/prettier
    '^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z ]+\))?: [\w ]+$';
const GITHUB_PULL_REQUEST_EVENT = 'pull_request';
const GITHUB_PULL_REQUEST_TARGET_EVENT = 'pull_request_target';

function run(): void {
    try {
        const { eventName } = github.context;
        core.info(`Event name: ${eventName}`);

        if (
            eventName !== GITHUB_PULL_REQUEST_EVENT &&
            eventName !== GITHUB_PULL_REQUEST_TARGET_EVENT
        ) {
            core.setFailed(`Invalid event: ${eventName}`);
            return;
        }

        const pullRequestTitle: string | undefined =
            github.context.payload.pull_request?.title;
        core.info(`PR title: ${pullRequestTitle}`);

        if (!pullRequestTitle) {
            core.setFailed('Pull Request title not defined');
            return;
        }

        const inputPattern = core.getInput('pattern');
        const inputFlags = core.getInput('flags');

        if (inputFlags === '') {
            core.info('No input flags present. Will fallback to default');
        }

        const regexPattern =
            inputPattern === '' ? DEFAULT_PATTERN : inputPattern;
        const regexFlags = inputFlags === '' ? DEFAULT_FLAGS : inputFlags;

        core.info(`Pattern: ${regexPattern}`);
        core.info(`Flags: ${regexFlags}`);

        const regex = new RegExp(regexPattern, regexFlags);
        const regexExistsInTitle = regex.test(pullRequestTitle);

        if (!regexExistsInTitle) {
            core.setFailed('PR title does not contain the regex pattern');
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
