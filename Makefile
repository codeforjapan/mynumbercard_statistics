download:
	docker-compose run app python download.py
download_all:
	docker-compose run app python download.py --all
convert:
	docker-compose run app python convert_data.py
download_and_convert: download convert

