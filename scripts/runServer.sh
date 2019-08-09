#!/bin/bash

npm install pnpm -g

cd ../src/server

pnpm install

pnpm run build

pnpm run start:prod
