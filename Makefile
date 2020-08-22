#!make
-include .env

download:
	docker-compose run app python mynumbercard_data/download.py
download_all:
	docker-compose run app python mynumbercard_data/download.py --all
convert:
	docker-compose run app python mynumbercard_data/convert_data.py
download_and_convert: download convert

remove_out_cache:
	rm -rf data/out

reconvert: remove_out_cache convert

trigger-reconvert:
	curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" \
       -H "Content-Type: application/json" \
       https://api.github.com/repos/codeforjapan/mynumbercard_statistics/dispatches \
       --data '{"event_type":"test_trigger","client_payload":{"test":true}}'
