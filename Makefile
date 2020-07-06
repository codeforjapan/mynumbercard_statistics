#!make

download:
	docker-compose run app python download.py
download_all:
	docker-compose run app python download.py --all
convert:
	docker-compose run app python convert_data.py
download_and_convert: download convert

remove_out_cache:
	rm -rf data/out

reconvert: remove_out_cache convert

trigger-reconvert:
	include .env
	curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" \
       -H "Content-Type: application/json" \
       https://api.github.com/repos/codeforjapan/mynumbercard_statistics/dispatches \
       --data '{"event_type":"test_trigger","client_payload":{"test":true}}'
