#!/bin/sh

echo "Building static assets..."

broccoli build app/static-dist

touch .commit

exit