<p align="center">
  <a href="https://github.com/UplandJacob/retrieve-changed-files/actions"><img alt="UplandJacob/retrieve-changed-files status" src="https://github.com/UplandJacob/retrieve-changed-files/workflows/Test/badge.svg"></a>
</p>

Forked from [masesgroup/retrieve-changed-files](https://github.com/masesgroup/retrieve-changed-files)

Originally from [jitterbit/get-changed-files](https://github.com/jitterbit/get-changed-files)

This repo is kept up to date to prevent deprecation warnings in actions.

# Retrieve All Changed Files

Retrieve all of the files changed/modified in a pull request or push's commits.
You can choose to retrieve all changed files, only added files, only modified files, only removed files, only renamed files, or all added and modified files.
These outputs are available via the `steps` output context.
The `steps` output context exposes the output names `all`, `added`, `modified`, `removed`, `renamed`, and `added_modified`.

# Usage

See [action.yml](action.yml) for all options and outputs.

```yaml
- uses: UplandJacob/retrieve-changed-files@v4
  with:
    # Format of the steps output context.
    # Can be 'space-delimited', 'csv', or 'json'.
    # Default: 'space-delimited'
    format: ''
```

## Permissions
This action uses the [Github Compare API](https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#compare-two-commits), which requires at leaset the following permission:

```yaml
permissions:
  contents: read
```

## Scenarios

- [Retrieve all changed files as space-delimited](#retrieve-all-changed-files-as-space-delimited)
- [Retrieve all added and modified files as CSV](#retrieve-all-added-and-modified-files-as-csv)
- [Retrieve all removed files as JSON](#retrieve-all-removed-files-as-json)

### Retrieve all changed files as space-delimited

If there are any files with spaces in them, then this method won't work and the step will fail.
Consider using one of the other formats if that's the case.

```yaml
- id: files
  uses: UplandJacob/retrieve-changed-files@v4
- run: |
    for changed_file in ${{ steps.files.outputs.all }}; do
      echo "Do something with this ${changed_file}."
    done
```

### Retrieve all added and modified files as CSV

```yaml
- id: files
  uses: UplandJacob/retrieve-changed-files@v4
  with:
    format: 'csv'
- run: |
    mapfile -d ',' -t added_modified_files < <(printf '%s,' '${{ steps.files.outputs.added_modified }}')
    for added_modified_file in "${added_modified_files[@]}"; do
      echo "Do something with this ${added_modified_file}."
    done
```

### Retrieve all removed files as JSON

```yaml
- id: files
  uses: UplandJacob/retrieve-changed-files@v4
  with:
    format: 'json'
- run: |
    readarray -t removed_files <<<"$(jq -r '.[]' <<<'${{ steps.files.outputs.removed }}')"
    for removed_file in ${removed_files[@]}; do
      echo "Do something with this ${removed_file}."
    done
```

# Install, Build, Lint, Test, and Package

Make sure to do the following before checking in any code changes.

```bash
$ yarn
$ yarn all
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
