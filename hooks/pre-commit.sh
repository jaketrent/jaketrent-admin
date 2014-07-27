#!/bin/sh

echo "Building static assets..."

broccoli build app/static-dist
git add app/static-dist

RETVAL=$?

if [ $RETVAL -ne 0 ]
then
  exit 1
fi
