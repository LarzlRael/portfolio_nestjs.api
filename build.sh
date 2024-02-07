nest_api_dir="portfolio_nestjs.api"

#!/bin/bash
cd './../portfolio.spa'

#!
npm run build

#!

rm -r "../$nest_api_dir.api/client"
cp -r './dist' "../$nest_api_dir/"


cd "./../$nest_api_dir"


git checkout deploy
git a
git commit -m "Deploy"
git push