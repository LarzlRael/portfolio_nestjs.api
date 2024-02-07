nest_api_dir="portfolio_nestjs.api"
branche_name="deployRender"
#!/bin/bash
cd './../portfolio.spa'

#!
npm run build

#!

rm -r "../$nest_api_dir.api/client"
cp -r './dist' "../$nest_api_dir/"


cd "./../$nest_api_dir"


git checkout $deployRender
git a
git commit -m "Deploy"
git push