# gh-clubhouse-sync

Sync Github Issues with Clubhouse stories.

### Usage

This tool it was design to sync multiple github repositories to multiple Clubhouse projects.

In order to achieve that, we need a way to define this mapping.

For now, we have `PROJECT_MAPPING_PATH` which represents the path to a json file, which describe the
following mapping

```json
{
  "githubOrg/repo": "Project"
}
```

You'll also need a Github personal access token and a Clubhouse token.

The Github token can be obtained from `Github` > `Settings` > `Developer settings` >
`Personal access tokens` > `Generate new token`

For the Clubhouse token, you'll need to go `Clubhouse` > `Settings` > `API Tokens` >
`Generate new token`.

##### Docker

```bash
docker run -v ./mapping.json:/opt/gh-clubhouse-sync/project-mapping \
           -e GITHUB_TOKEN='personal token' \
           -e CLUBHOUSE_TOKEN='clubhouse token' \
           -e PROJECT_MAPPING_PATH='/opt/gh-clubhouse-sync/project-mapping' quay.io/freight-trust/gh-clubhouse-sync
```

##### K8s

In order to store the there is a configmap in `chart/templates/configmap.yaml` and the secrets are
defined in `values.yaml`.

```
helm install --name gh-clubhouse-sync .
```

## License

MIT
