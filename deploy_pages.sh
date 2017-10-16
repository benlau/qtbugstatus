#!/bin/bash
set -e # exit with nonzero exit code if anything fails

REPO=git@github.com:benlau/qtbugstatus.git

if [ -f .git ]
then
    echo "It can not deploy a git repo into another git repo"
    exit -1;
fi

git init

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit --author="Ben Lau <xbenlau@gmail.com>"  -m "Deploy to GitHub Pages"
git --no-pager log

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force $REPO master:gh-pages 
