# Installation

## Quick install (macOS & Linux)

```bash
curl -fsSL https://specscore.md/install/get-cli | sh
```

The script detects your OS and architecture, downloads the matching archive
from the latest [GitHub release](https://github.com/synchestra-io/specscore-cli/releases),
verifies its SHA‑256 checksum, and installs the `specscore` binary to
`/usr/local/bin` (or `~/.local/bin` if `/usr/local/bin` isn't writable).

### Options

The installer reads two optional environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `SPECSCORE_VERSION` | `latest` | Release tag to install, e.g. `v0.1.0`. |
| `SPECSCORE_INSTALL_DIR` | `/usr/local/bin` or `~/.local/bin` | Directory to install the binary into. |

Install a specific version into `~/.local/bin`:

```bash
curl -fsSL https://specscore.md/install/get-cli | \
  SPECSCORE_VERSION=v0.1.0 SPECSCORE_INSTALL_DIR="$HOME/.local/bin" sh
```

### Inspect before running

If you prefer to review the script before piping it into a shell:

```bash
curl -fsSL https://specscore.md/install/get-cli -o get-cli.sh
less get-cli.sh
sh get-cli.sh
```

## Homebrew (macOS & Linux)

```bash
brew install synchestra-io/tap/specscore
```

This taps `synchestra-io/homebrew-tap` on first install and tracks new releases
from there.

## Quick install (Windows)

Pick whichever channel fits your environment — all three install the same
binary from the same [GitHub release](https://github.com/synchestra-io/specscore-cli/releases).

### PowerShell (mirrors the `curl | sh` flow)

```powershell
powershell -c "irm https://specscore.md/install/get-cli.ps1 | iex"
```

The script detects your architecture, downloads the matching `.zip` from the
latest release, verifies its SHA‑256 checksum, installs `specscore.exe` to
`%LOCALAPPDATA%\Programs\specscore\bin`, and appends that directory to your
**user** `PATH`. No admin rights required. Open a new terminal afterwards so
the updated `PATH` takes effect.

The installer reads the same environment variables as the Unix script:

| Variable | Default | Description |
| --- | --- | --- |
| `SPECSCORE_VERSION` | `latest` | Release tag to install, e.g. `v0.1.0`. |
| `SPECSCORE_INSTALL_DIR` | `%LOCALAPPDATA%\Programs\specscore\bin` | Directory to install the binary into. |

### WinGet

```powershell
winget install Synchestra.SpecScore
```

### Scoop

```powershell
scoop bucket add synchestra https://github.com/synchestra-io/scoop-bucket
scoop install specscore
```

## Manual install

1. Download the archive for your platform from the
   [GitHub Releases page](https://github.com/synchestra-io/specscore-cli/releases).
   Archives follow the pattern
   `specscore_<version>_<os>_<arch>.<ext>`:
   - `specscore_<version>_darwin_amd64.tar.gz`
   - `specscore_<version>_darwin_arm64.tar.gz`
   - `specscore_<version>_linux_amd64.tar.gz`
   - `specscore_<version>_linux_arm64.tar.gz`
   - `specscore_<version>_windows_amd64.zip`
2. Verify its SHA‑256 checksum against
   `specscore_<version>_checksums.txt` from the same release.
3. Extract the archive and move `specscore` (or `specscore.exe` on Windows)
   to a directory on your `PATH`.

## Build from source

Requires [Go](https://go.dev/) 1.26 or newer. This installs the latest development build from `main` — may include changes not yet in a tagged release.

```bash
go install github.com/synchestra-io/specscore-cli/cmd/specscore@main
```

If you want a published release instead, use the install script at the top of this page. To pin a specific version when building from source, swap `@main` for a tag like `@v0.4.2`, or use `@latest` to get the most recent tagged release.

## Verify the install

```bash
specscore version
```

You should see a line like:

```
specscore 0.1.0 (<commit>) <date>
```
