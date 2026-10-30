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
# Cloudflare Pages has no native publish-dir ignore mechanism, so we delete
# it here to keep it from being served at https://specscore.md/README.md.
echo "==> Removing local-dev README (excluded from CF Pages deploy)"
rm -f public/README.md

# Landing comparison pages ship a raw Markdown sibling. List the English
# URLs in llms.txt so an agent that only reads the index can find them.
if ! grep -q '/vs/kiro.md' public/llms.txt; then
  cat >> public/llms.txt << 'EOF'

## Comparisons

- [SpecScore vs Kiro](https://specscore.md/vs/kiro.md): Kiro is AWS's agentic IDE that writes EARS requirements. SpecScore is an open spec format linted in CI.
- [SpecScore vs Tessl](https://specscore.md/vs/tessl.md): Tessl is an agent-skills platform; its tile and 2025 essay treat the spec as source. SpecScore lints a portable format in CI.
- [SpecScore vs the BMAD Method](https://specscore.md/vs/bmad-method.md): The BMAD Method is an agile AI-agent workflow. SpecScore is the spec format a CI job can lint.
- [SpecScore vs Task Master AI](https://specscore.md/vs/task-master-ai.md): Task Master parses a PRD into tasks. SpecScore is the lintable spec those tasks can cite.
EOF
fi

echo "==> Done. public/ ready for Cloudflare Pages deploy."
