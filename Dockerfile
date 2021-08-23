FROM python:3.8 AS builder

WORKDIR /usr/src/app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv \
 && pipenv install --system


FROM python:3.8-slim

RUN apt-get update -y && apt-get install -y \
        python3-opencv \
        libopencv-dev \
        ghostscript \
        libsm-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1

COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages

COPY . ./
