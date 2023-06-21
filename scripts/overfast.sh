#!/bin/bash

ROOT_DIR="./src/lib/overfast/api"

clean() {
  find $ROOT_DIR -mindepth 1 -not \( -name 'openapitools.json' -or -name '.openapi-generator-ignore' \) -delete
}

generate() {
  (cd $ROOT_DIR && openapi-generator-cli generate)
  find $ROOT_DIR -type f -name '*.ts' -exec sed -i '1s/^/\/\/@ts-nocheck\n/' {} \;
  sed -i "/export \* from '.\/HitPoints';/d" "$ROOT_DIR/models/index.ts"
}

case "$1" in
  generate) generate;;
  clean) clean;;
  *) echo "Usage: $0 {generate|clean}";;
esac
