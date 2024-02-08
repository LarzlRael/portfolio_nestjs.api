#!/bin/bash
nest_api_dir="portfolio_nestjs.api"
branche_name="deployRender"

current_date_time="`date +%Y%m%d%H%M%S`";
echo $current_date_time;


cd './../portfolio.spa'

#!
npm run build
mv './dist' "./public_folder"

#!

rm -r "../$nest_api_dir/public_folder"
cp -r './public_folder' "../$nest_api_dir/"


cd "./../$nest_api_dir"


git checkout $deployRender
git a
git commit -m "$current_date_time Deploy"
git push