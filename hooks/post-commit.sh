#!/bin/sh
echo "Adding static assets"

if [ -a .commit ]
  then
  rm .commit
  git add app/static-dist
  git commit --amend -C HEAD --no-verify
fi

exit