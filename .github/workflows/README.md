# GitHub Workflows

- `dogfood.yml`: the required `lint` check runs on every pull request and push to `main`.
- `site-ci.yml`: builds and tests the docs and Astro landing, saves the complete deployment artifact, and publishes that artifact on `main` through the `production` environment. See [website deployment](../../WEBSITE-STACK.md#hosting).

## Open Questions

None at this time.
