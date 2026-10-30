# webcheck

WASI build of `specscore spec lint` for the in-browser checker at `/check/`.

`main.go` calls `github.com/specscore/specscore-cli/pkg/lint` at the version in `go.mod`. That version matches `SPECSCORE_VERSION` in `.github/workflows/dogfood.yml`. The landing build runs `build.sh` and serves `tools/landing/public/check/specscore-lint.wasm`.

Arguments:

- `--catalog` prints the lint rule registry as JSON.
- Otherwise the first argument is the spec root (`/work/spec`) and the second is the project root (`/work`). Violations are JSON on stdout.

## Open Questions

None at this time.
