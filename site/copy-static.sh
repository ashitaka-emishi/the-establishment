#!/usr/bin/env bash
set -euo pipefail

site_dir="$(cd "$(dirname "$0")" && pwd)"
repo_dir="$(cd "$site_dir/.." && pwd)"
out_dir="$repo_dir/_site"

rm -rf "$out_dir/webgame" "$out_dir/docs" "$out_dir/__docs"
mkdir -p "$out_dir/__docs"

cp -R "$repo_dir/webgame" "$out_dir/webgame"
cp -R "$repo_dir/docs" "$out_dir/docs"
cp -R "$repo_dir/__docs__/cards" "$out_dir/__docs/cards"

touch "$out_dir/.nojekyll"
find "$out_dir" -name .DS_Store -delete
