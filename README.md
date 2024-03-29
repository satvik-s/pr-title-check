# PR Title Verify

![GitHub release (latest by date)](https://img.shields.io/github/v/release/satvik-s/pr-title-check)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/satvik-s/pr-title-check/build-test?label=build)

GitHub action to check if a pull request title matches a regex pattern.

## Configuration

Please refer to [action definition](action.yml) and the following example workflow.

More information about `pattern` and `flags` can be found in the
[JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

`flags` is optional and defaults to `gm`.
`pattern` is optional and defaults to conventional commit regex pattern.

### Sample Workflow

```yml
name: 'PR Title Check'
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
      - name: PR Title Verify
        uses: satvik-s/pr-title-check
        with:
          pattern: '(fix|feat|chore|docs|style|refactor|perf|test): (?:\w+\b\W*){3,8}$'
```

## License

This project is released under the terms of the [MIT License](LICENSE)
