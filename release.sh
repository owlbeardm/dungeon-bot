#!/bin/bash

now=$(date +"%Y-%m-%d-%H.%M.%S")

echo "Releasing dungeon-bot $now"

git stash
git flow release start $now
rm -rf dist

if [ -z $1 ];
then
  version=$(npm version patch)
elif [ "$1" == "minor" ];
then
  version=$(npm version minor)
else
  version=$(npm version $1)
fi

npm run lint
npm run build
git add -A
git commit -am "prerelease $version"
git flow release publish $now
git checkout release
git pull
rm **/*.js
rm **/*.ts
cp -a dist/. .
git add -A
git commit -am "release $version"
git push
git checkout release/$now
git flow release finish -nm "$version" $now
