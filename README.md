<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# PR Title Verify

![GitHub release (latest by date)](https://img.shields.io/github/v/release/satvik-s/pr-title-check)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/satvik-s/pr-title-check/build-test?label=build)

GitHub action to check if a pull request title matches a regex pattern.

## Configuration

Please refer to [action definition](action.yml) and the following example workflow.

More information about `pattern` and `flags` can be found in the
[JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

`flags` is optional and defaults to `gm`.

### Sample Workflow

```yml
name: 'check PR title'
on:
    pull_request:
        types:
            - opened
            - edited
            - synchronize
            - labeled
            - unlabeled

jobs:
    check:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: satvik-s/pr-title-check
              with:
                  pattern: '(fix|feat|chore|docs|style|refactor|perf|test): (\S| )+'
```

## License

This project is released under the terms of the [MIT License](LICENSE)
