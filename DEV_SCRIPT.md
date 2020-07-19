# CONVERTER DEVELOPMENT

## Use Python

Please install Python 3 and below dependencies

```bash
brew install ghostscript
pip install pipenv
```

Then sync the libraries.

```bash
pipenv sync
```

## Structure

- download.py : contains download script
- converter_data.py : contains converter script
- converter.py : contains converter class
- Makefile: calls docker-compose script

## When you want to add new libraries

```bash
pipenv install [new_library]
docker-compose up -d --build
```
