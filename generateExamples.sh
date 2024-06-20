#!/bin/bash

# example: sh ./loadTableData.sh <local|dev|uat|prod>

set -e

# run loadTableData
cd ./src || exit
yarn install
yarn run-all-generate
