#!/bin/bash
cd './../portfolio.spa'

#!
npm run build

#!

rm -r '../portfolio_nestjs.api/src/public/dist'
cp -r './dist' '../portfolio_nestjs.api/src/public/'


cd './../portfolio_nestjs.api'


git checkout deploy
git a
git commit -m "Deploy"
git push