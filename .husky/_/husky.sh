#!/bin/sh
# Husky script base
if [ -z "$husky_skip_init" ]; then
  hook_name="$(basename "$0")"
  hook_path=".husky/$hook_name"
  if [ -f "$hook_path" ]; then
    . "$hook_path"
  fi
fi
