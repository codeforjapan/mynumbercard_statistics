# MyNumberCard Dashboard


## DEPENDENCIES

Ghostscipt
```
brew install ghostscript
```

## INSTALL

```
git clone [this repo]
docker-compose up -d
```

## When you want to add new libraries

```
pipenv install `library`
docker-compose up -d --build
```

## Download csv data from PDF file

```
docker-compose run app pytnon download.py
```

If you want to redownload all files
```
docker-compose run app pytnon download.py --all
```
