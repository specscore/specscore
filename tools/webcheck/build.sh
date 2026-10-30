#!/bin/sh
# Compile specscore spec lint (the pinned CLI module) to WASI for /check/.
set -eu
cd "$(dirname "$0")"

if ! command -v go >/dev/null 2>&1; then
  if [ -x /tmp/go/bin/go ]; then
    PATH="/tmp/go/bin:$PATH"
    export PATH
  else
    echo "Go 1.27+ is required to build the spec checker" >&2
    exit 1
  fi
fi

out="../landing/public/check/specscore-lint.wasm"
mkdir -p "$(dirname "$out")"
GOOS=wasip1 GOARCH=wasm go build -ldflags='-s -w' -o "$out" .
echo "wrote $out"
