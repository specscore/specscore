#!/bin/sh
# Cloudflare Pages build orchestrator.
#
# Runs both sub-project builds and assembles `public/` for deploy.
# Designed to be called as the entire CF Pages "Build command":
#
#     sh tools/cf-build.sh
#
# Why a script instead of inlining the command in the CF dashboard:
# the dashboard's build-command input is a single string field, but
# any newline that sneaks into the pasted value (e.g., from a copy
# that wrapped in a different UI) breaks the shell chain in a hard-
# to-debug way. A script in the repo is version-controlled, reviewable
# in PRs, and immune to that class of bug.
#
# See WEBSITE-STACK.md for the broader dual-stack rationale.

set -eu

echo "==> Building docs site (tools/site-generator)"
pnpm --dir tools/site-generator install --frozen-lockfile
pnpm --dir tools/site-generator build

echo "==> Building landing (tools/landing — Astro)"
pnpm --dir tools/landing install --frozen-lockfile
pnpm --dir tools/landing build

echo "==> Merging landing into public/ (Astro index.html wins)"
cp -r tools/landing/dist/. public/

echo "==> Placing Cloudflare-only config files at publish-dir root"
cp _headers _redirects public/

# The docs generator copies tools/site-generator/public-readme.md to
# public/README.md as a local-dev notice ("this dir is auto-generated").
# Cloudflare Pages has no native publish-dir ignore mechanism — Firebase
# excludes it via firebase.json's hosting.ignore array, but for CF we
# delete it here so it isn't served at https://specscore.md/README.md.
echo "==> Removing local-dev README (excluded from CF Pages deploy)"
rm -f public/README.md

echo "==> Done. public/ ready for Cloudflare Pages deploy."
