#!/bin/bash

# example: sh ./loadTemplates.sh <local|dev|uat|prod>

set -e

# run loadTableData
cd ./src || exit
yarn install
yarn loadTemplates:"$1"
